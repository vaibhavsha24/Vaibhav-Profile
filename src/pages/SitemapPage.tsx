import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { formatDisplayDate } from '../lib/content';
import { PUBLISHED_ARTICLES } from '../lib/mdxArticles';
import { CASE_STUDIES } from '../lib/siteData';

const MAIN_PAGES = [
  { path: '/', title: 'Home', description: 'Overview, portrait, experience snapshot, and featured writing.' },
  { path: '/about', title: 'About', description: 'Background, 3-role experience timeline, education, and technical skills.' },
  { path: '/projects', title: 'Projects & Case Studies', description: 'Birdie and six structured Android/platform/AI case studies.' },
  { path: '/writing', title: 'Writing', description: 'Full archive of published technical essays and external publications.' },
  { path: '/now', title: 'Now', description: 'Current engineering focus across AOSP, NFC validation, and RAG tooling.' },
  { path: '/contact', title: 'Contact', description: 'Direct email, phone, GitHub, LinkedIn, Resume PDF, and contact form.' },
  { path: '/rss', title: 'RSS Feed', description: 'Syndication feed URL and list of published essays.' },
];

export function SitemapPage() {
  usePageMetadata({
    title: 'Sitemap — Vaibhav Sharma',
    description:
      'Complete directory of pages, engineering case studies, and published articles on Vaibhav Sharma’s personal engineering website.',
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
      <header className="flex flex-col gap-4 border-b border-[var(--border-hairline)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs font-medium text-[var(--text-muted)]">Directory</p>
          <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
            Sitemap
          </h1>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Every page, case study, and published article on this site. Search engines also read the
            machine-readable XML index at <code className="font-mono text-xs">/sitemap.xml</code>.
          </p>
        </div>

        <a
          href="/sitemap.xml"
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <span>Raw XML Sitemap</span>
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
        </a>
      </header>

      <div className="mt-12 space-y-12">
        <section aria-labelledby="sitemap-pages-heading" className="space-y-4">
          <h2
            id="sitemap-pages-heading"
            className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]"
          >
            Main Pages ({MAIN_PAGES.length})
          </h2>
          <ul className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {MAIN_PAGES.map((page) => (
              <li key={page.path} className="py-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <Link
                  to={page.path}
                  className="font-serif text-lg font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {page.title}
                </Link>
                <span className="text-xs text-[var(--text-secondary)] sm:text-right">
                  {page.description}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sitemap-articles-heading" className="space-y-4">
          <h2
            id="sitemap-articles-heading"
            className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]"
          >
            Published Articles ({PUBLISHED_ARTICLES.length})
          </h2>
          <ul className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {PUBLISHED_ARTICLES.map((article) => (
              <li key={article.slug} className="py-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <Link
                  to={`/writing/${article.slug}`}
                  className="font-serif text-lg font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {article.title}
                </Link>
                <span className="font-mono text-xs text-[var(--text-muted)] shrink-0 tabular-nums">
                  {formatDisplayDate(article.date)} · {article.readingTimeLabel}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="sitemap-projects-heading" className="space-y-4">
          <h2
            id="sitemap-projects-heading"
            className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]"
          >
            Engineering Case Studies ({CASE_STUDIES.length})
          </h2>
          <ul className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {CASE_STUDIES.map((study) => (
              <li key={study.id} className="py-4 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <Link
                  to={`/projects#${study.id}`}
                  className="font-serif text-lg font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {study.title}
                </Link>
                <span className="font-mono text-xs text-[var(--text-muted)] shrink-0">
                  {study.category}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
