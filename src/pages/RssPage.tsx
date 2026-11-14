import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Check, Copy, Rss } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { formatDisplayDate } from '../lib/content';
import { PUBLISHED_ARTICLES } from '../lib/mdxArticles';

export function RssPage() {
  usePageMetadata({
    title: 'RSS Feed & Syndication — Vaibhav Sharma',
    description:
      'Subscribe to Vaibhav Sharma’s engineering journal via RSS (/rss.xml) for articles on Android architecture, AOSP NFC internals, and hardware automation.',
  });

  const [copied, setCopied] = useState(false);
  const feedUrl =
    typeof window !== 'undefined' ? `${window.location.origin}/rss.xml` : '/rss.xml';

  async function handleCopyFeedUrl() {
    try {
      await navigator.clipboard.writeText(feedUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard failures
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
      <Link
        to="/writing"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        <span>Back to Writing</span>
      </Link>

      <header className="mt-6 space-y-4 border-b border-[var(--border-hairline)] pb-8">
        <p className="text-xs font-medium text-[var(--text-muted)]">Syndication</p>
        <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
          RSS Feed
        </h1>
        <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)]">
          An RSS feed lets feed reader apps (such as Feedly, NetNewsWire, Reeder, or Inoreader)
          automatically fetch new articles from this site without needing an account or algorithm.
        </p>
      </header>

      <section className="mt-8 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--accent-primary)]">
          <Rss className="h-4 w-4" aria-hidden="true" />
          <span>RSS 2.0 Feed Endpoint</span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <code className="flex-1 overflow-x-auto rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-3.5 py-2.5 font-mono text-xs text-[var(--text-primary)]">
            {feedUrl}
          </code>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyFeedUrl}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copied URL</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Copy Feed URL</span>
                </>
              )}
            </button>

            <a
              href="/rss.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap"
            >
              <span>Open Raw XML</span>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section aria-labelledby="rss-items-heading" className="mt-12 space-y-6">
        <h2
          id="rss-items-heading"
          className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]"
        >
          Included Published Articles ({PUBLISHED_ARTICLES.length})
        </h2>

        <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
          {PUBLISHED_ARTICLES.map((article) => (
            <article key={article.slug} className="py-5 space-y-1.5">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] tabular-nums">
                <span className="font-mono">{formatDisplayDate(article.date)}</span>
                <span aria-hidden="true">·</span>
                <span className="text-[var(--accent-primary)]">{article.category}</span>
                <span aria-hidden="true">·</span>
                <span>{article.readingTimeLabel}</span>
              </div>
              <h3 className="font-serif text-lg font-medium text-[var(--text-primary)]">
                <Link
                  to={`/writing/${article.slug}`}
                  className="hover:text-[var(--accent-primary)] transition-colors"
                >
                  {article.title}
                </Link>
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">{article.summary}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
