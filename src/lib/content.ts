export type ArticleCategory =
  | 'Android Architecture'
  | 'Engineering Productivity'
  | 'AOSP & NFC Framework'
  | 'Testing & Hardware Automation'
  | 'Reliability & Debugging'
  | 'Career & Systems';

export type ArticleStatus = 'published' | 'proposed' | 'draft';

export interface ArticleMeta {
  title: string;
  slug: string;
  date: string;
  category: ArticleCategory | string;
  status: ArticleStatus;
  order?: number;
  summary: string;
  featured: boolean;
  coverImage?: string;
  coverCaption?: string;
  externalUrl?: string;
  externalLabel?: string;
  readingTimeMinutes: number;
  readingTimeLabel: string;
  wordCount: number;
}

export interface ArticleHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface ContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Strips YAML frontmatter and JSX/import lines before calculating reading time.
 */
export function stripMdxPreamble(rawMdx: string): string {
  if (typeof rawMdx !== 'string') return '';
  const withoutFrontmatter = rawMdx.replace(/^---[\s\S]*?---\s*/m, '');
  const withoutImports = withoutFrontmatter
    .split('\n')
    .filter((line) => !/^\s*(import|export)\s+/.test(line))
    .join('\n');
  return withoutImports.trim();
}

/**
 * Computes deterministic reading time at 215 words per minute.
 */
export function calculateReadingTime(rawMdx: string): {
  minutes: number;
  words: number;
  label: string;
} {
  const body = stripMdxPreamble(rawMdx);
  const plainText = body
    .replace(/```[\s\S]*?```/g, (match) => {
      const codeWords = match.split(/\s+/).filter(Boolean).length;
      return ' word '.repeat(Math.ceil(codeWords * 0.45));
    })
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>\[\]()!|]/g, ' ');

  const words = plainText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 215));
  return {
    minutes,
    words,
    label: `${minutes} min read`,
  };
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Extracts h2 and h3 headings from MDX source for the margin Table of Contents.
 */
export function extractHeadingsFromMdx(rawMdx: string): ArticleHeading[] {
  const body = stripMdxPreamble(rawMdx).replace(/```[\s\S]*?```/g, '');
  const headings: ArticleHeading[] = [];
  for (const line of body.split('\n')) {
    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (match) {
      const level = match[1].length as 2 | 3;
      const text = match[2].replace(/[`*_]/g, '').trim();
      if (text) {
        headings.push({
          id: slugifyHeading(text),
          text,
          level,
        });
      }
    }
  }
  return headings;
}

/**
 * Parses YAML frontmatter block cleanly for Node/server RSS & sitemap generation.
 */
export function parseMdxFrontmatter(rawMdx: string): Record<string, string | boolean | number> {
  const match = /^---\s*\n([\s\S]*?)\n---/m.exec(rawMdx);
  if (!match) return {};
  const result: Record<string, string | boolean | number> = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (val === 'true') {
      result[key] = true;
    } else if (val === 'false') {
      result[key] = false;
    } else if (/^\d+$/.test(val)) {
      result[key] = Number(val);
    } else {
      result[key] = val;
    }
  }
  return result;
}

export function formatDisplayDate(isoDate: string): string {
  const parsed = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) return isoDate;
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(parsed);
}

export function sortArticlesByDate<T extends { date: string; order?: number }>(articles: T[]): T[] {
  return [...articles].sort((a, b) => {
    const tA = Date.parse(a.date);
    const tB = Date.parse(b.date);
    const dateDiff = (Number.isNaN(tB) ? 0 : tB) - (Number.isNaN(tA) ? 0 : tA);
    if (dateDiff !== 0) return dateDiff;
    return (a.order ?? 999) - (b.order ?? 999);
  });
}

export function filterArticles<T extends ArticleMeta>(
  articles: T[],
  category: string,
  query: string
): T[] {
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedQuery = query.trim().toLowerCase();

  return articles.filter((article) => {
    const matchesCategory =
      !normalizedCategory ||
      normalizedCategory === 'all' ||
      article.category.toLowerCase() === normalizedCategory;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const searchable = `${article.title} ${article.summary} ${article.category}`.toLowerCase();
    return searchable.includes(normalizedQuery);
  });
}

export function validateNewsletterEmail(email: string): {
  valid: boolean;
  normalizedEmail: string;
  error?: string;
} {
  const normalizedEmail = email.trim().toLowerCase();
  if (!normalizedEmail) {
    return { valid: false, normalizedEmail, error: 'Please enter an email address.' };
  }
  if (!EMAIL_REGEX.test(normalizedEmail)) {
    return {
      valid: false,
      normalizedEmail,
      error: 'Please provide a valid email address (for example, name@domain.com).',
    };
  }
  return { valid: true, normalizedEmail };
}

export function validateContactForm(input: ContactSubmission): {
  valid: boolean;
  errors: Partial<Record<keyof ContactSubmission, string>>;
} {
  const errors: Partial<Record<keyof ContactSubmission, string>> = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const subject = input.subject.trim();
  const message = input.message.trim();

  if (name.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }
  if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid reply email address.';
  }
  if (subject.length < 3) {
    errors.subject = 'Please include a brief topic or subject.';
  }
  if (message.length < 15) {
    errors.message = 'Please write a message of at least 15 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRssXml(articles: ArticleMeta[], baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const publishedOnly = sortArticlesByDate(
    articles.filter((article) => article.status === 'published')
  );
  const itemsXml = publishedOnly
    .map((article) => {
      const link = `${cleanBase}/writing/${encodeURIComponent(article.slug)}`;
      const pubDate = new Date(`${article.date}T08:00:00Z`).toUTCString();
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${escapeXml(link)}</link>
      <guid isPermaLink="true">${escapeXml(link)}</guid>
      <pubDate>${escapeXml(pubDate)}</pubDate>
      <category>${escapeXml(article.category)}</category>
      <description>${escapeXml(article.summary)}</description>
    </item>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vaibhav Sharma — Android &amp; Platform Engineering</title>
    <link>${escapeXml(cleanBase)}</link>
    <description>Technical writing on Android application and platform engineering, AOSP, NFC hardware integration, and system reliability.</description>
    <language>en-us</language>
    <atom:link href="${escapeXml(`${cleanBase}/rss.xml`)}" rel="self" type="application/rss+xml" />
${itemsXml}
  </channel>
</rss>`;
}

export function generateSitemapXml(
  staticRoutes: string[],
  articles: ArticleMeta[],
  baseUrl: string
): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  const publishedArticles = articles.filter((article) => article.status === 'published');
  const urls = [
    ...staticRoutes.map((route) => ({
      loc: `${cleanBase}${route === '/' ? '' : route}`,
      lastmod: new Date().toISOString().slice(0, 10),
      priority: route === '/' ? '1.0' : '0.8',
    })),
    ...publishedArticles.map((article) => ({
      loc: `${cleanBase}/writing/${encodeURIComponent(article.slug)}`,
      lastmod: article.date,
      priority: '0.7',
    })),
  ];

  const entriesXml = urls
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(entry.loc)}</loc>
    <lastmod>${escapeXml(entry.lastmod)}</lastmod>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entriesXml}
</urlset>`;
}

export function generateRobotsTxt(baseUrl: string): string {
  const cleanBase = baseUrl.replace(/\/+$/, '');
  return `User-agent: *
Allow: /

Sitemap: ${cleanBase}/sitemap.xml
`;
}
