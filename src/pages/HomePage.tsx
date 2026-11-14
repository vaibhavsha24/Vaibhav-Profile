import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { EditorialImage } from '../components/EditorialImage';
import { NewsletterBlock } from '../components/NewsletterBlock';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { formatDisplayDate } from '../lib/content';
import { ALL_ARTICLES, PUBLISHED_ARTICLES } from '../lib/mdxArticles';
import {
  BIRDIE_FEATURED,
  CASE_STUDIES,
  EXPERIENCE_LIST,
  NOW_INTERESTS,
  SITE_PROFILE,
} from '../lib/siteData';

export function HomePage() {
  usePageMetadata({
    title: 'Vaibhav Sharma — Android & Platform Engineer',
    description:
      'Lead Engineer at Samsung R&D Institute Bangalore and former Software Engineer at Probo India and TCS. 5 years across consumer Android applications, AOSP NFC framework, and AI-powered tooling.',
  });

  const [leadPublished, ...otherPublished] = PUBLISHED_ARTICLES;
  const secondaryPublished = otherPublished.slice(0, 3);
  const featuredCases = CASE_STUDIES.filter((c) => c.featured).slice(0, 4);
  const primaryRoles = EXPERIENCE_LIST.slice(0, 2);
  const earlierRole = EXPERIENCE_LIST[2];

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8">
      {/* Split-Screen Editorial Hero */}
      <section className="py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-stretch lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-between gap-8"
          >
            <div className="space-y-6">
              <p className="text-xs font-medium text-[var(--text-muted)]">
                {SITE_PROFILE.roleKicker}
              </p>
              <h1 className="font-serif text-[clamp(2.2rem,4vw,3.45rem)] font-medium leading-[1.09] tracking-tight text-[var(--text-primary)]">
                {SITE_PROFILE.headline}
              </h1>
              <p className="max-w-xl text-base sm:text-[1.0625rem] leading-relaxed text-[var(--text-secondary)]">
                {SITE_PROFILE.introSummary}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                to="/projects"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
              >
                <span>Explore Case Studies</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/about#experience"
                className="inline-flex min-h-[44px] items-center gap-1.5 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-5 py-2.5 text-sm font-medium text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
              >
                <span>Experience &amp; Background</span>
              </Link>
              <a
                href={SITE_PROFILE.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-[44px] items-center gap-1.5 px-2.5 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap shrink-0"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                <span>Resume (PDF)</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center"
          >
            <EditorialImage
              src={SITE_PROFILE.profilePhotoPath}
              alt={SITE_PROFILE.profilePhotoAlt}
              aspectClassName="aspect-square"
              className="w-full max-w-[420px]"
              imgClassName="object-cover object-top"
              caption={SITE_PROFILE.profilePhotoCaption}
              priority
            />
          </motion.div>
        </div>

        {/* Full-Width 4-Pillar Discipline Strip */}
        <div className="mt-14 grid grid-cols-1 gap-6 border-y border-[var(--border-hairline)] py-8 sm:grid-cols-2 lg:grid-cols-4">
          {SITE_PROFILE.coreDomains.map((pillar) => (
            <div key={pillar.index} className="space-y-1.5">
              <p className="font-mono text-xs tabular-nums text-[var(--text-muted)]">
                {pillar.index}.
              </p>
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">{pillar.title}</h2>
              <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Snapshot: Samsung R&D, Probo India & TCS */}
      <section aria-labelledby="experience-snapshot-heading" className="py-10 sm:py-14">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--border-hairline)] pb-5">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">
              5 Years · Android Applications to Platform Systems
            </p>
            <h2
              id="experience-snapshot-heading"
              className="mt-1 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
            >
              Engineering Experience
            </h2>
          </div>
          <Link
            to="/about#experience"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Detailed experience, education &amp; skills</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {primaryRoles.map((exp) => (
            <div
              key={exp.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 sm:p-8"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--accent-primary)]">
                    {exp.organization} · {exp.location}
                  </span>
                  <span className="font-mono">{exp.periodLabel}</span>
                </div>
                <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
                  {exp.role}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {exp.summary}
                </p>
                <ul className="pt-2 space-y-1.5 text-sm text-[var(--text-secondary)] list-disc pl-5">
                  {exp.highlights.slice(0, 4).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              {exp.outcomes && (
                <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-[var(--border-hairline)] pt-5 sm:grid-cols-4">
                  {exp.outcomes.map((metric) => (
                    <div key={metric.label} className="space-y-0.5">
                      <dt className="font-mono text-lg font-semibold tabular-nums text-[var(--text-primary)]">
                        {metric.value}
                      </dt>
                      <dd className="text-[11px] leading-snug text-[var(--text-muted)]">
                        {metric.label}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          ))}
        </div>

        {earlierRole && (
          <div className="mt-6 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-7">
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-4 space-y-1">
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  {earlierRole.periodLabel}
                </p>
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  {earlierRole.role}
                </h3>
                <p className="text-xs font-medium text-[var(--accent-primary)]">
                  {earlierRole.organization} · {earlierRole.location}
                </p>
              </div>
              <div className="lg:col-span-8 space-y-2">
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {earlierRole.summary}
                </p>
                <p className="font-mono text-xs text-[var(--text-muted)]">
                  Beacon · GPS · NFC · Room Database · Coroutines · JobScheduler · Foreground Services
                </p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Featured Initiative: Birdie + Selected Case Studies */}
      <section aria-labelledby="selected-projects-heading" className="py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--border-hairline)] pb-5">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">
              Projects &amp; Case Studies
            </p>
            <h2
              id="selected-projects-heading"
              className="mt-1 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
            >
              Featured Engineering Work
            </h2>
          </div>
          <Link
            to="/projects#case-studies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0"
          >
            <span>All {CASE_STUDIES.length} case studies</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Birdie Highlight Row */}
        <div className="mt-8 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-3">
              <p className="text-xs font-medium text-[var(--accent-primary)]">
                {BIRDIE_FEATURED.context}
              </p>
              <h3 className="font-serif text-2xl font-medium text-[var(--text-primary)]">
                {BIRDIE_FEATURED.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {BIRDIE_FEATURED.problemSummary} Birdie enabled in-app screenshot bug reporting
                with automatic app version, device model, and OS metadata routed to Slack and
                tracked through a Kanban workflow with in-app status updates.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap lg:flex-col lg:items-end gap-3">
              <Link
                to="/projects#birdie"
                className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors whitespace-nowrap shrink-0"
              >
                <span>Read Birdie Case Study</span>
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
              <a
                href={BIRDIE_FEATURED.referenceArticleUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <span>Probo Engineering Article</span>
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          {featuredCases.map((study) => (
            <article
              key={study.id}
              className="flex flex-col justify-between rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 sm:p-7 transition-colors hover:border-[var(--text-muted)]"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[var(--text-muted)]">
                  <span className="font-medium text-[var(--accent-primary)]">{study.category}</span>
                  <span className="font-mono">{study.contextLabel}</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  {study.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {study.problem}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--border-hairline)] pt-4">
                <p className="text-xs font-mono text-[var(--text-muted)] truncate">
                  {study.architectureAndTools.slice(0, 4).join(' · ')}
                </p>
                <Link
                  to={`/projects#${study.id}`}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] whitespace-nowrap shrink-0"
                >
                  <span>Case study</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Featured Published Articles & Upcoming Topics */}
      <section aria-labelledby="featured-writing-heading" className="py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--border-hairline)] pb-5">
          <div>
            <p className="text-xs font-medium text-[var(--text-muted)]">
              Writing &amp; Engineering Journal
            </p>
            <h2
              id="featured-writing-heading"
              className="mt-1 font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
            >
              Published Articles &amp; Notes
            </h2>
          </div>
          <Link
            to="/writing"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0"
          >
            <span>All {ALL_ARTICLES.length} journal entries</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {leadPublished && (
            <article className="lg:col-span-7 group">
              <Link
                to={`/writing/${leadPublished.slug}`}
                className="block space-y-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-lg"
              >
                <EditorialImage
                  src={leadPublished.coverImage}
                  alt={leadPublished.title}
                  aspectClassName="aspect-[16/9]"
                />
                <div className="space-y-2.5 pt-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] tabular-nums">
                    <span className="font-medium text-[var(--accent-primary)]">
                      {leadPublished.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Published · {formatDisplayDate(leadPublished.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{leadPublished.readingTimeLabel}</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-[1.75rem] font-medium leading-snug tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {leadPublished.title}
                  </h3>
                  <p className="text-sm sm:text-[0.9375rem] leading-relaxed text-[var(--text-secondary)]">
                    {leadPublished.summary}
                  </p>
                </div>
              </Link>
              {leadPublished.externalUrl && (
                <a
                  href={leadPublished.externalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] hover:underline"
                >
                  <span>{leadPublished.externalLabel || 'Read original article'}</span>
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              )}
            </article>
          )}

          <div className="lg:col-span-5 flex flex-col divide-y divide-[var(--border-hairline)] border-t border-b border-[var(--border-hairline)] lg:border-t-0">
            {secondaryPublished.map((article) => (
              <article key={article.slug} className="py-5 first:pt-2 lg:first:pt-0 group">
                <Link
                  to={`/writing/${article.slug}`}
                  className="block space-y-1.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--accent-primary)] rounded-sm"
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--text-muted)] tabular-nums">
                    <span className="font-medium text-[var(--accent-primary)]">
                      {article.category}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>Published · {formatDisplayDate(article.date)}</span>
                    <span aria-hidden="true">·</span>
                    <span>{article.readingTimeLabel}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-medium leading-snug text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    {article.summary}
                  </p>
                </Link>
                {article.externalUrl && (
                  <a
                    href={article.externalUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-[var(--accent-primary)] hover:underline"
                  >
                    <span>{article.externalLabel || 'Read original article'}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                )}
              </article>
            ))}

            <div className="py-5">
              <Link
                to="/writing"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <span>Browse all {ALL_ARTICLES.length} published articles</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Current Interests / Now Snapshot */}
      <section aria-labelledby="now-snapshot-heading" className="py-12 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between border-b border-[var(--border-hairline)] pb-5">
          <div className="max-w-3xl space-y-2">
            <p className="text-xs font-medium text-[var(--text-muted)]">
              Current Focus · Updated {NOW_INTERESTS.lastUpdated}
            </p>
            <h2
              id="now-snapshot-heading"
              className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
            >
              Now &amp; Engineering Focus
            </h2>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {NOW_INTERESTS.overview}
            </p>
          </div>
          <Link
            to="/now"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent-primary)] hover:text-[var(--accent-hover)] transition-colors whitespace-nowrap shrink-0"
          >
            <span>Full /now breakdown</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {NOW_INTERESTS.currentFocus.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-elevated)] p-6 space-y-3"
            >
              <p className="text-xs font-medium text-[var(--accent-primary)]">{item.area}</p>
              <h3 className="font-serif text-xl font-medium leading-snug text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                {item.description}
              </p>
              {item.details && item.details.length > 0 && (
                <ul className="space-y-1.5 border-t border-[var(--border-hairline)] pt-3 text-xs leading-relaxed text-[var(--text-secondary)] list-disc pl-4">
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="py-8">
        <NewsletterBlock />
      </div>
    </div>
  );
}
