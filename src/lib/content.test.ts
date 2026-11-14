import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateReadingTime,
  extractHeadingsFromMdx,
  filterArticles,
  formatDisplayDate,
  generateRobotsTxt,
  generateRssXml,
  generateSitemapXml,
  parseMdxFrontmatter,
  sortArticlesByDate,
  validateContactForm,
  validateNewsletterEmail,
  type ArticleMeta,
} from './content';

const sampleMdx = `---
title: "Understanding NFC inside the Android framework"
slug: "understanding-nfc-inside-android-framework"
date: "2026-11-14"
category: "AOSP & NFC Framework"
status: "proposed"
order: 1
featured: true
---

## Motivation & Scope

Tracing Android NFC Settings and framework services across AOSP.

### State Transitions

\`\`\`kotlin
// AOSP boundary notes
\`\`\`

${'Hardware and platform reliability require careful state diagnostics. '.repeat(35)}
`;

test('parseMdxFrontmatter extracts title, slug, date, category, status, order, and booleans', () => {
  const fm = parseMdxFrontmatter(sampleMdx);
  assert.equal(fm.title, 'Understanding NFC inside the Android framework');
  assert.equal(fm.slug, 'understanding-nfc-inside-android-framework');
  assert.equal(fm.status, 'proposed');
  assert.equal(fm.order, 1);
  assert.equal(fm.featured, true);
});

test('calculateReadingTime strips frontmatter/imports and computes realistic minutes', () => {
  const result = calculateReadingTime(sampleMdx);
  assert.ok(result.words > 180);
  assert.ok(result.minutes >= 1);
  assert.match(result.label, /^\d+ min read$/);
});

test('extractHeadingsFromMdx returns structured h2 and h3 headings with slugs', () => {
  const headings = extractHeadingsFromMdx(sampleMdx);
  assert.deepEqual(headings, [
    { id: 'motivation-scope', text: 'Motivation & Scope', level: 2 },
    { id: 'state-transitions', text: 'State Transitions', level: 3 },
  ]);
});

test('sortArticlesByDate orders newest articles first and breaks ties with order', () => {
  const sorted = sortArticlesByDate([
    { slug: 'second', date: '2026-11-14', order: 2 },
    { slug: 'old', date: '2026-01-10', order: 1 },
    { slug: 'first', date: '2026-11-14', order: 1 },
  ]);
  assert.deepEqual(
    sorted.map((a) => a.slug),
    ['first', 'second', 'old']
  );
});

test('filterArticles filters by category and search query', () => {
  const list: ArticleMeta[] = [
    {
      title: 'Understanding NFC inside the Android framework',
      slug: 'understanding-nfc-inside-android-framework',
      date: '2026-11-14',
      category: 'AOSP & NFC Framework',
      status: 'proposed',
      summary: 'Tracing NFC Settings and framework services.',
      featured: true,
      readingTimeMinutes: 2,
      readingTimeLabel: '2 min outline',
      wordCount: 300,
    },
    {
      title: 'What makes hardware-dependent Android testing difficult?',
      slug: 'hardware-dependent-android-testing-difficulties',
      date: '2026-11-14',
      category: 'Testing & Hardware Automation',
      status: 'proposed',
      summary: 'Mobly and PN532 hardware validation.',
      featured: true,
      readingTimeMinutes: 2,
      readingTimeLabel: '2 min outline',
      wordCount: 300,
    },
  ];

  assert.equal(filterArticles(list, 'All', '').length, 2);
  assert.equal(filterArticles(list, 'AOSP & NFC Framework', '').length, 1);
  assert.equal(filterArticles(list, 'All', 'pn532').length, 1);
  assert.equal(filterArticles(list, 'AOSP & NFC Framework', 'mobly').length, 0);
});

test('validateNewsletterEmail validates and normalizes addresses', () => {
  assert.equal(validateNewsletterEmail('').valid, false);
  assert.equal(validateNewsletterEmail('not-an-email').valid, false);
  const ok = validateNewsletterEmail('  Reader@Example.DEV ');
  assert.equal(ok.valid, true);
  assert.equal(ok.normalizedEmail, 'reader@example.dev');
});

test('validateContactForm enforces name, email, subject, and message length', () => {
  const invalid = validateContactForm({
    name: 'V',
    email: 'bad',
    subject: 'Hi',
    message: 'Too short',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.subject);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    name: 'Ananya Verma',
    email: 'ananya@example.com',
    subject: 'Android NFC architecture question',
    message: 'Would love to discuss how you approach Mobly and PN532 validation.',
  });
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});
});

test('generateRssXml and generateSitemapXml only include published articles, never proposed topics', () => {
  const articles: ArticleMeta[] = [
    {
      title: 'Published Essay',
      slug: 'published-essay',
      date: '2026-10-12',
      category: 'AOSP & NFC Framework',
      status: 'published',
      summary: 'Published systems essay.',
      featured: true,
      readingTimeMinutes: 4,
      readingTimeLabel: '4 min outline',
      wordCount: 800,
    },
    {
      title: 'Proposed Draft Topic',
      slug: 'proposed-draft-topic',
      date: '2026-11-14',
      category: 'Testing & Hardware Automation',
      status: 'proposed',
      summary: 'Unpublished draft topic.',
      featured: true,
      readingTimeMinutes: 2,
      readingTimeLabel: '2 min outline',
      wordCount: 300,
    },
  ];

  const rss = generateRssXml(articles, 'https://vaibhavsharma.example');
  assert.ok(rss.includes('<rss version="2.0"'));
  assert.ok(rss.includes('Published Essay'));
  assert.ok(!rss.includes('Proposed Draft Topic'));

  const sitemap = generateSitemapXml(['/', '/about'], articles, 'https://vaibhavsharma.example');
  assert.ok(sitemap.includes('<loc>https://vaibhavsharma.example/about</loc>'));
  assert.ok(sitemap.includes('<loc>https://vaibhavsharma.example/writing/published-essay</loc>'));
  assert.ok(!sitemap.includes('proposed-draft-topic'));

  const robots = generateRobotsTxt('https://vaibhavsharma.example');
  assert.ok(robots.includes('Sitemap: https://vaibhavsharma.example/sitemap.xml'));
  assert.equal(formatDisplayDate('2026-10-12'), 'Oct 12, 2026');
});
