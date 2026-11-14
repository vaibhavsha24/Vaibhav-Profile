import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import {
  calculateReadingTime,
  generateRobotsTxt,
  generateRssXml,
  generateSitemapXml,
  parseMdxFrontmatter,
  sortArticlesByDate,
  validateContactForm,
  validateNewsletterEmail,
  type ArticleMeta,
  type ArticleStatus,
} from './src/lib/content.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const ARTICLES_DIR = path.join(__dirname, 'src', 'content', 'articles');
const DATA_DIR = path.join(__dirname, '.data');
const SUBSCRIBERS_FILE = path.join(DATA_DIR, 'newsletter-subscribers.json');
const MESSAGES_FILE = path.join(DATA_DIR, 'contact-messages.json');

interface SubscriberRecord {
  email: string;
  subscribedAt: string;
}

interface ContactRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  receivedAt: string;
}

function ensureDataDir(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJsonFile<T>(filePath: string, fallback: T): T {
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJsonFile<T>(filePath: string, data: T): void {
  ensureDataDir();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

function loadMdxArticlesMetadata(): ArticleMeta[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const files = fs.readdirSync(ARTICLES_DIR).filter((file) => file.endsWith('.mdx'));
  const articles: ArticleMeta[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(ARTICLES_DIR, file), 'utf-8');
    const fm = parseMdxFrontmatter(raw);
    const reading = calculateReadingTime(raw);
    const slug = String(fm.slug || file.replace(/\.mdx$/, ''));
    const statusRaw = String(fm.status || 'proposed');
    const status: ArticleStatus =
      statusRaw === 'published' || statusRaw === 'draft' ? statusRaw : 'proposed';

    articles.push({
      title: String(fm.title || slug),
      slug,
      date: String(fm.date || '2026-11-14'),
      category: String(fm.category || 'Engineering'),
      status,
      order: typeof fm.order === 'number' ? fm.order : 999,
      summary: String(fm.summary || ''),
      featured: Boolean(fm.featured),
      coverImage: fm.coverImage ? String(fm.coverImage) : undefined,
      coverCaption: fm.coverCaption ? String(fm.coverCaption) : undefined,
      readingTimeMinutes: reading.minutes,
      readingTimeLabel: status === 'published' ? `${reading.minutes} min read` : reading.label,
      wordCount: reading.words,
    });
  }

  return sortArticlesByDate(articles);
}

function resolveBaseUrl(req: express.Request): string {
  if (process.env.APP_URL && process.env.APP_URL !== 'MY_APP_URL') {
    return process.env.APP_URL;
  }
  const proto = req.headers['x-forwarded-proto'] || req.protocol || 'http';
  const host = req.headers['x-forwarded-host'] || req.get('host') || `localhost:${PORT}`;
  return `${proto}://${host}`;
}

async function startServer(): Promise<void> {
  const app = express();
  app.use(express.json({ limit: '256kb' }));

  app.get('/rss.xml', (req, res) => {
    const articles = loadMdxArticlesMetadata();
    const xml = generateRssXml(articles, resolveBaseUrl(req));
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  });

  app.get('/sitemap.xml', (req, res) => {
    const articles = loadMdxArticlesMetadata();
    const staticRoutes = ['/', '/about', '/writing', '/projects', '/now', '/contact', '/rss', '/sitemap'];
    const xml = generateSitemapXml(staticRoutes, articles, resolveBaseUrl(req));
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    res.send(xml);
  });

  app.get('/robots.txt', (req, res) => {
    const txt = generateRobotsTxt(resolveBaseUrl(req));
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send(txt);
  });

  app.post('/api/newsletter', (req, res) => {
    const email = typeof req.body?.email === 'string' ? req.body.email : '';
    const validation = validateNewsletterEmail(email);

    if (!validation.valid) {
      res.status(400).json({ ok: false, error: validation.error });
      return;
    }

    const subscribers = readJsonFile<SubscriberRecord[]>(SUBSCRIBERS_FILE, []);
    const exists = subscribers.some((sub) => sub.email === validation.normalizedEmail);

    if (exists) {
      res.status(200).json({
        ok: true,
        alreadySubscribed: true,
        message: 'You are already subscribed to engineering dispatches.',
      });
      return;
    }

    subscribers.push({
      email: validation.normalizedEmail,
      subscribedAt: new Date().toISOString(),
    });
    writeJsonFile(SUBSCRIBERS_FILE, subscribers);

    res.status(201).json({
      ok: true,
      alreadySubscribed: false,
      message: 'Subscribed. New essays and technical notes will arrive in your inbox.',
    });
  });

  app.post('/api/contact', (req, res) => {
    const payload = {
      name: typeof req.body?.name === 'string' ? req.body.name : '',
      email: typeof req.body?.email === 'string' ? req.body.email : '',
      subject: typeof req.body?.subject === 'string' ? req.body.subject : '',
      message: typeof req.body?.message === 'string' ? req.body.message : '',
    };

    const validation = validateContactForm(payload);
    if (!validation.valid) {
      res.status(400).json({ ok: false, errors: validation.errors });
      return;
    }

    const messages = readJsonFile<ContactRecord[]>(MESSAGES_FILE, []);
    const record: ContactRecord = {
      id: `msg_${Date.now()}`,
      name: payload.name.trim(),
      email: payload.email.trim(),
      subject: payload.subject.trim(),
      message: payload.message.trim(),
      receivedAt: new Date().toISOString(),
    };
    messages.push(record);
    writeJsonFile(MESSAGES_FILE, messages);

    res.status(201).json({
      ok: true,
      id: record.id,
      message: 'Message received. Thank you for reaching out.',
    });
  });

  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir, { index: false }));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
