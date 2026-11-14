import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Rss, Search, X } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { filterArticles, formatDisplayDate } from '../lib/content';
import {
  ALL_ARTICLES,
  ARTICLE_CATEGORIES,
  PROPOSED_TOPICS,
  PUBLISHED_ARTICLES,
} from '../lib/mdxArticles';

export function WritingPage() {
  usePageMetadata({
    title: 'Writing & Journal — Vaibhav Sharma',
    description:
      'Published engineering articles on scaling MVVM in large Android apps and Birdie bug-tracking at Probo, plus draft outlines covering AOSP NFC and hardware automation.',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredArticles = useMemo(
    () => filterArticles(ALL_ARTICLES, selectedCategory, searchQuery),
    [selectedCategory, searchQuery]
  );

  const publishedFiltered = useMemo(
    () => filteredArticles.filter((article) => article.status === 'published'),
    [filteredArticles]
  );

  const proposedFiltered = useMemo(
    () => filteredArticles.filter((article) => article.status !== 'published'),
    [filteredArticles]
  );

  const hasActiveFilters = selectedCategory !== 'All' || searchQuery.trim().length > 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:px-8">
      {/* Header */}
      <div className="flex flex-col gap-6 border-b border-[var(--border-hairline)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Writing &amp; Engineering Journal · {PUBLISHED_ARTICLES.length} Published
            {PROPOSED_TOPICS.length > 0 ? ` · ${PROPOSED_TOPICS.length} Draft Outlines` : ''}
          </p>
          <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
            Articles &amp; Engineering Notes
          </h1>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            Full technical essays covering Android architecture at scale, AOSP NFC internals,
            Mobly &amp; PN532 hardware validation, mobile bug-reporting workflows, connectivity
            debugging, and platform engineering—published in MDX alongside canonical Medium and
            Probo Engineering editions.
          </p>
        </div>
        <Link
          to="/rss"
          className="inline-flex min-h-[40px] items-center gap-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
        >
          <Rss className="h-3.5 w-3.5" aria-hidden="true" />
          <span>RSS Feed</span>
        </Link>
      </div>

      {/* Filter Controls & Search */}
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div
          role="group"
          aria-label="Filter articles and topics by category"
          className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[var(--bg-surface)] p-1.5"
        >
          {ARTICLE_CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`min-h-[36px] rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)] ${
                  isActive
                    ? 'bg-[var(--bg-elevated)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72 shrink-0">
          <label htmlFor="writing-search" className="sr-only">
            Search articles and topics
          </label>
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]"
            aria-hidden="true"
          />
          <input
            id="writing-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search writing..."
            className="min-h-[42px] w-full rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] py-2 pr-9 pl-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
              className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Count Row */}
      <div className="mt-6 flex items-center justify-between text-xs text-[var(--text-muted)] tabular-nums">
        <p>
          Showing {filteredArticles.length} of {ALL_ARTICLES.length}{' '}
          {ALL_ARTICLES.length === 1 ? 'entry' : 'entries'}
        </p>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="font-medium text-[var(--accent-primary)] hover:underline cursor-pointer"
          >
            Reset filters
          </button>
        )}
      </div>

      {filteredArticles.length > 0 ? (
        <div className="mt-6 space-y-14">
          {publishedFiltered.length > 0 && (
            <section aria-labelledby="published-articles-heading">
              <div className="border-b border-[var(--border-hairline)] pb-3">
                <h2
                  id="published-articles-heading"
                  className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]"
                >
                  Published Articles ({publishedFiltered.length})
                </h2>
              </div>
              <div className="divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
                {publishedFiltered.map((article) => (
                  <article key={article.slug} className="py-8 group">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-8">
                      <div className="md:col-span-3 flex flex-row md:flex-col gap-2 text-xs text-[var(--text-muted)] tabular-nums">
                        <span className="font-mono text-[var(--text-primary)]">
                          {formatDisplayDate(article.date)}
                        </span>
                        <span aria-hidden="true" className="md:hidden">
                          ·
                        </span>
                        <span>{article.readingTimeLabel}</span>
                        {article.externalUrl && (
                          <a
                            href={article.externalUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 font-medium text-[var(--accent-primary)] hover:underline md:mt-1"
                          >
                            <span>{article.externalLabel || 'Original source'}</span>
                            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                          </a>
                        )}
                      </div>

                      <div className="md:col-span-9 space-y-2">
                        <p className="text-xs font-medium text-[var(--accent-primary)]">
                          {article.category}
                        </p>
                        <Link
                          to={`/writing/${article.slug}`}
                          className="block space-y-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-sm"
                        >
                          <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                            {article.title}
                          </h3>
                          <p className="max-w-2xl text-sm sm:text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                            {article.summary}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {proposedFiltered.length > 0 && (
            <section aria-labelledby="proposed-topics-heading">
              <div className="border-b border-[var(--border-hairline)] pb-3">
                <h2
                  id="proposed-topics-heading"
                  className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]"
                >
                  Proposed Topics &amp; Draft Outlines ({proposedFiltered.length})
                </h2>
              </div>
              <div className="divide-y divide-[var(--border-hairline)] border-b border-[var(--border-hairline)]">
                {proposedFiltered.map((article) => (
                  <article key={article.slug} className="py-7 group">
                    <Link
                      to={`/writing/${article.slug}`}
                      className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-sm"
                    >
                      <div className="md:col-span-3 flex flex-row md:flex-col gap-2 text-xs text-[var(--text-muted)] tabular-nums">
                        <span className="font-mono">Draft Outline</span>
                        <span aria-hidden="true" className="md:hidden">
                          ·
                        </span>
                        <span>{article.readingTimeLabel}</span>
                      </div>

                      <div className="md:col-span-9 space-y-2">
                        <p className="text-xs font-medium text-[var(--accent-primary)]">
                          {article.category}
                        </p>
                        <h3 className="font-serif text-xl font-medium tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                          {article.title}
                        </h3>
                        <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)]">
                          {article.summary}
                        </p>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div className="mt-10 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-10 text-center space-y-3">
          <p className="font-serif text-xl text-[var(--text-primary)]">No matching articles</p>
          <p className="text-sm text-[var(--text-secondary)]">
            Try clearing your search term or selecting a different category filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="mt-2 inline-flex min-h-[40px] items-center rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--btn-primary-hover)] cursor-pointer"
          >
            Show all entries
          </button>
        </div>
      )}
    </div>
  );
}
