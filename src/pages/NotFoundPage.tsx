import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageMetadata } from '../hooks/usePageMetadata';

export function NotFoundPage() {
  usePageMetadata({
    title: 'Page Not Found — Vaibhav Sharma',
    description: 'The requested page could not be found.',
  });

  return (
    <div className="mx-auto max-w-3xl px-6 py-24 text-center space-y-5">
      <p className="font-mono text-xs uppercase tracking-wider text-[var(--text-muted)]">
        404 · Not Found
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium text-[var(--text-primary)]">
        This page does not exist
      </h1>
      <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
        The link you followed may have moved or is not part of the publication index.
      </p>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
