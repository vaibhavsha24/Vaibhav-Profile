import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';
import { NOW_INTERESTS } from '../lib/siteData';

export function NowPage() {
  usePageMetadata({
    title: 'Now — Vaibhav Sharma',
    description:
      'What Vaibhav Sharma is currently focused on at Samsung R&D Institute Bangalore: contributing to Google AOSP, NFC platform engineering, and AI-integrated internal developer tools to reduce team workload.',
  });

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20 lg:px-8">
      <header className="space-y-4 border-b border-[var(--border-hairline)] pb-8">
        <p className="text-xs font-medium tracking-wider uppercase text-[var(--text-muted)]">
          /now · Current Focus
        </p>
        <h1 className="font-serif text-[clamp(2rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-tight text-[var(--text-primary)]">
          Current Engineering Focus &amp; Interests
        </h1>
        <p className="text-base leading-relaxed text-[var(--text-secondary)]">
          {NOW_INTERESTS.overview}
        </p>
        <p className="text-sm text-[var(--text-muted)] font-mono">
          Last updated: {NOW_INTERESTS.lastUpdated}
        </p>
      </header>

      <div className="mt-12 space-y-14">
        <section aria-labelledby="now-platform-heading" className="space-y-6">
          <h2
            id="now-platform-heading"
            className="font-serif text-2xl font-medium text-[var(--text-primary)]"
          >
            01. Google AOSP, NFC Platform &amp; AI Developer Tooling
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {NOW_INTERESTS.currentFocus.map((entry) => (
              <div key={entry.title} className="py-7 space-y-3">
                <p className="text-xs font-medium text-[var(--accent-primary)]">{entry.area}</p>
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  {entry.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {entry.description}
                </p>
                {entry.details && entry.details.length > 0 && (
                  <ul className="space-y-1.5 pt-1 text-sm leading-relaxed text-[var(--text-primary)] list-disc pl-5">
                    {entry.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="now-exploring-heading" className="space-y-6">
          <h2
            id="now-exploring-heading"
            className="font-serif text-2xl font-medium text-[var(--text-primary)]"
          >
            02. Ongoing Explorations &amp; Technical Depth
          </h2>
          <div className="divide-y divide-[var(--border-hairline)] border-y border-[var(--border-hairline)]">
            {NOW_INTERESTS.exploring.map((entry) => (
              <div key={entry.title} className="py-7 space-y-3">
                <p className="text-xs font-medium text-[var(--accent-primary)]">{entry.area}</p>
                <h3 className="font-serif text-xl font-medium text-[var(--text-primary)]">
                  {entry.title}
                </h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  {entry.description}
                </p>
                {entry.details && entry.details.length > 0 && (
                  <ul className="space-y-1.5 pt-1 text-sm leading-relaxed text-[var(--text-primary)] list-disc pl-5">
                    {entry.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--text-secondary)]">
            Interested in discussing Google AOSP contributions, NFC hardware validation, or
            AI-powered internal developer tools?
          </p>
          <Link
            to="/contact"
            className="inline-flex min-h-[40px] items-center gap-1.5 rounded-md bg-[var(--btn-primary-bg)] px-4 py-2 text-xs font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors whitespace-nowrap shrink-0 self-start sm:self-auto"
          >
            <span>Get in touch</span>
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  );
}
