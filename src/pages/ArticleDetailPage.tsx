import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Link2 } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { mdxComponents } from '../components/MdxComponents';
import { NewsletterBlock } from '../components/NewsletterBlock';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { formatDisplayDate } from '../lib/content';
import { getAdjacentArticles, getArticleBySlug } from '../lib/mdxArticles';

export function ArticleDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>();
  const article = getArticleBySlug(slug);
  const { prev, next } = getAdjacentArticles(slug);
  const [readProgress, setReadProgress] = useState(0);
  const [linkCopied, setLinkCopied] = useState(false);

  usePageMetadata({
    title: article ? `${article.title} — Vaibhav Sharma` : 'Article Not Found — Vaibhav Sharma',
    description: article
      ? article.summary
      : 'The requested entry could not be found in the writing journal.',
    type: article?.status === 'published' ? 'article' : 'website',
    publishedDate: article?.status === 'published' ? article.date : undefined,
    section: article?.category,
  });

  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setReadProgress(0);
        return;
      }
      setReadProgress(Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)));
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [slug]);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setLinkCopied(true);
      window.setTimeout(() => setLinkCopied(false), 1800);
    } catch {
      // Ignore clipboard failures
    }
  }

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-24 text-center space-y-4">
        <p className="text-xs font-medium tracking-wider uppercase text-[var(--text-muted)]">
          404 · Not Found
        </p>
        <h1 className="font-serif text-3xl font-medium text-[var(--text-primary)]">
          Entry not found
        </h1>
        <p className="text-sm text-[var(--text-secondary)]">
          That slug does not exist in the current writing journal.
        </p>
        <Link
          to="/writing"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Writing</span>
        </Link>
      </div>
    );
  }

  const ArticleContent = article.Component;
  const isPublished = article.status === 'published';

  return (
    <>
      {/* Reading Progress Bar */}
      <div
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-40 h-[2px] bg-transparent pointer-events-none"
      >
        <div
          className="h-full bg-[var(--accent-primary)] transition-[width] duration-100"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      <article className="mx-auto max-w-6xl px-6 py-12 sm:py-16 lg:px-8">
        <Link
          to="/writing"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Back to Writing</span>
        </Link>

        {/* Header */}
        <header className="mt-8 max-w-3xl space-y-5">
          {!isPublished && (
            <div className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-3 text-xs text-[var(--text-secondary)]">
              <strong className="font-semibold text-[var(--text-primary)]">
                Proposed Topic · Unpublished Draft Outline:
              </strong>{' '}
              This page previews an editable MDX outline in{' '}
              <code className="font-mono">src/content/articles/{article.slug}.mdx</code>.
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] tabular-nums">
            <span className="font-medium text-[var(--accent-primary)]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{isPublished ? formatDisplayDate(article.date) : 'Draft Outline'}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readingTimeLabel}</span>
            <span aria-hidden="true">·</span>
            <span>{article.wordCount} words</span>
          </div>

          <h1 className="font-serif text-[clamp(2rem,4vw,3.25rem)] font-medium leading-[1.1] tracking-tight text-[var(--text-primary)]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-[var(--text-secondary)]">
            {article.summary}
          </p>

          {article.externalUrl && (
            <div className="pt-1">
              <a
                href={article.externalUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--accent-primary)] hover:border-[var(--accent-primary)] transition-colors"
              >
                <span>{article.externalLabel || 'Read original external article'}</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          )}
        </header>

        {article.coverImage && (
          <div className="mt-10">
            <EditorialImage
              src={article.coverImage}
              alt={article.title}
              aspectClassName="aspect-[21/9]"
              caption={article.coverCaption}
              priority
            />
          </div>
        )}

        {/* Asymmetric 2-Column Reading Canvas */}
        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="editorial-prose">
              <MDXProvider components={mdxComponents}>
                <ArticleContent components={mdxComponents} />
              </MDXProvider>
            </div>
          </div>

          <aside aria-label="Outline navigation and actions" className="lg:col-span-4">
            <div className="lg:sticky lg:top-8 space-y-8 border-t border-[var(--border-hairline)] pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0">
              {article.headings.length > 0 && (
                <nav aria-label="Table of contents" className="space-y-3">
                  <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]">
                    Sections
                  </h2>
                  <ul className="space-y-2 text-sm">
                    {article.headings.map((heading) => (
                      <li
                        key={heading.id}
                        className={heading.level === 3 ? 'pl-3.5 text-xs' : ''}
                      >
                        <a
                          href={`#${heading.id}`}
                          className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors leading-snug block"
                        >
                          {heading.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}

              <div className="space-y-3 border-t border-[var(--border-hairline)] pt-6">
                <h2 className="text-xs font-semibold tracking-wider uppercase text-[var(--text-muted)]">
                  Share &amp; Source
                </h2>
                {article.externalUrl && (
                  <a
                    href={article.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors"
                  >
                    <span>{article.externalLabel || 'Read Original'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex min-h-[40px] w-full items-center justify-center gap-2 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors cursor-pointer"
                >
                  {linkCopied ? (
                    <>
                      <Check
                        className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400"
                        aria-hidden="true"
                      />
                      <span>Link copied</span>
                    </>
                  ) : (
                    <>
                      <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </aside>
        </div>

        {/* Previous / Next Navigation */}
        <nav
          aria-label="Adjacent entries"
          className="mt-16 grid grid-cols-1 gap-6 border-t border-[var(--border-hairline)] pt-10 sm:grid-cols-2"
        >
          <div>
            {prev && (
              <Link
                to={`/writing/${prev.slug}`}
                className="group block space-y-1 rounded-lg border border-[var(--border-hairline)] p-5 hover:border-[var(--text-muted)] transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Previous</span>
                </span>
                <p className="font-serif text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {prev.title}
                </p>
              </Link>
            )}
          </div>
          <div>
            {next && (
              <Link
                to={`/writing/${next.slug}`}
                className="group block space-y-1 rounded-lg border border-[var(--border-hairline)] p-5 text-left sm:text-right hover:border-[var(--text-muted)] transition-colors"
              >
                <span className="inline-flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <span>Next</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
                <p className="font-serif text-lg font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                  {next.title}
                </p>
              </Link>
            )}
          </div>
        </nav>

        <div className="mt-16">
          <NewsletterBlock />
        </div>
      </article>
    </>
  );
}
