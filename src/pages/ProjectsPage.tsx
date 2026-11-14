import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { BIRDIE_FEATURED, CASE_STUDIES } from '../lib/siteData';

const CASE_STUDY_CATEGORIES = [
  'All',
  ...Array.from(new Set(CASE_STUDIES.map((study) => study.category))),
];

export function ProjectsPage() {
  usePageMetadata({
    title: 'Projects & Case Studies — Vaibhav Sharma',
    description:
      'Six engineering case studies: Birdie at Probo India, Android NFC Framework, Mobly & PN532 Dragon Reader automation, Android performance at 50M+ scale, real-time sockets, and AI tooling.',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const visibleStudies = useMemo(() => {
    if (selectedCategory === 'All') return CASE_STUDIES;
    return CASE_STUDIES.filter((study) => study.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:px-8">
      <header className="border-b border-[var(--border-hairline)] pb-8">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Projects &amp; Case Studies
          </p>
          <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
            Engineering Systems &amp; Case Studies
          </h1>
          <p className="text-base leading-relaxed text-[var(--text-secondary)]">
            Six structured engineering case studies spanning developer tooling, Android AOSP NFC
            framework work, hardware-in-the-loop automation, consumer performance at 50M+ user
            scale, real-time mobile architecture, and AI-powered engineering tooling.
          </p>
        </div>
      </header>

      {/* Dedicated Featured Project: Birdie */}
      <section
        id="birdie"
        aria-labelledby="birdie-spotlight-heading"
        className="mt-10 scroll-mt-10 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-6 space-y-4">
            <p className="text-xs font-medium text-[var(--accent-primary)]">
              Featured Project · {BIRDIE_FEATURED.context}
            </p>
            <h2
              id="birdie-spotlight-heading"
              className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
            >
              {BIRDIE_FEATURED.title}
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              <strong className="font-semibold text-[var(--text-primary)]">Problem addressed:</strong>{' '}
              {BIRDIE_FEATURED.problemSummary}
            </p>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">
              {BIRDIE_FEATURED.attributionNote}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                to="/writing/birdie-custom-bug-tracking-tool-android-ios"
                className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Read full Birdie article</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href={BIRDIE_FEATURED.referenceArticleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[42px] items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2 text-xs font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Probo Engineering original</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 border-t border-[var(--border-hairline)] pt-6 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 space-y-3">
            <h3 className="text-xs font-semibold text-[var(--text-muted)]">
              End-to-End Bug Reporting Workflow
            </h3>
            <ol className="space-y-2.5 text-sm text-[var(--text-primary)]">
              {BIRDIE_FEATURED.workflow.map((step, idx) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="font-mono text-xs tabular-nums text-[var(--accent-primary)] pt-0.5">
                    0{idx + 1}.
                  </span>
                  <span className="leading-relaxed text-[var(--text-secondary)]">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Case Studies Filter Bar */}
      <section id="case-studies" aria-label="Engineering case studies" className="mt-14 scroll-mt-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div
            role="group"
            aria-label="Filter case studies by topic"
            className="flex flex-wrap items-center gap-1.5 rounded-lg bg-[var(--bg-surface)] p-1.5"
          >
            {CASE_STUDY_CATEGORIES.map((category) => {
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

          <p className="text-xs text-[var(--text-muted)] tabular-nums">
            Showing {visibleStudies.length} of {CASE_STUDIES.length} case studies
          </p>
        </div>

        {/* Structured 6-Part Case Studies */}
        <div className="mt-8 space-y-10">
          {visibleStudies.map((study) => (
            <article
              key={study.id}
              id={study.id}
              className="scroll-mt-10 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 sm:p-9"
            >
              <div className="border-b border-[var(--border-hairline)] pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono tabular-nums">{study.number}.</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-[var(--accent-primary)]">
                      {study.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{study.contextLabel}</span>
                  </div>
                  {study.referenceLink && (
                    <a
                      href={study.referenceLink.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 font-medium text-[var(--accent-primary)] hover:underline"
                    >
                      <span>{study.referenceLink.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>

                <h2 className="font-serif text-2xl sm:text-[1.8rem] font-medium tracking-tight text-[var(--text-primary)]">
                  {study.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)]">{study.subtitle}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)]">
                    Problem
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {study.problem}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)]">
                    Engineering Challenge
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {study.engineeringChallenge}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)]">
                    Technical Approach
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {study.technicalApproach}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)]">
                    Architecture and Tools
                  </h3>
                  <p className="font-mono text-xs leading-relaxed text-[var(--text-primary)]">
                    {study.architectureAndTools.join(' · ')}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)]">
                    Trade-offs and Decisions
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {study.tradeoffsAndDecisions}
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-semibold text-[var(--text-muted)]">
                    Outcome and Learnings
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {study.outcomeAndLearnings}
                  </p>
                </div>
              </div>

              <p className="mt-6 border-t border-[var(--border-hairline)] pt-4 text-xs text-[var(--text-muted)]">
                {study.externalLinksNote}
              </p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
