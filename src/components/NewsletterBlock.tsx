import { useState, type FormEvent } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { validateNewsletterEmail } from '../lib/content';

export function NewsletterBlock() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validateNewsletterEmail(email);
    if (!validation.valid) {
      setStatus('error');
      setFeedback(validation.error || 'Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setFeedback('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: validation.normalizedEmail }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.ok) {
        setStatus('error');
        setFeedback(data.error || 'Unable to subscribe right now. Please try again.');
        return;
      }

      setStatus('success');
      setFeedback(
        data.message || 'Subscribed. New essays and technical notes will arrive in your inbox.'
      );
      setEmail('');
    } catch {
      setStatus('error');
      setFeedback('Network error while subscribing. Please try again shortly.');
    }
  }

  return (
    <section
      aria-labelledby="newsletter-heading"
      className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6 sm:p-10"
    >
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-6 space-y-2.5">
          <p className="text-xs font-medium text-[var(--text-muted)]">
            Engineering Journal Updates
          </p>
          <h2
            id="newsletter-heading"
            className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-[var(--text-primary)]"
          >
            Notes on Android internals, NFC hardware, and reliability
          </h2>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)] max-w-lg">
            Subscribe to receive new engineering essays and technical notes on Android internals,
            NFC hardware validation, and production reliability.
          </p>
        </div>

        <div className="lg:col-span-6">
          <form onSubmit={handleSubmit} noValidate className="space-y-3">
            <label
              htmlFor="newsletter-email"
              className="block text-xs font-medium text-[var(--text-secondary)]"
            >
              Email address
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                id="newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status !== 'idle') {
                    setStatus('idle');
                    setFeedback('');
                  }
                }}
                placeholder="you@domain.com"
                aria-invalid={status === 'error'}
                aria-describedby={feedback ? 'newsletter-feedback' : undefined}
                className="min-h-[44px] flex-1 rounded-md border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]/20"
              />
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--btn-primary-hover)] disabled:opacity-60 transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-primary)]"
              >
                <span>{status === 'submitting' ? 'Subscribing...' : 'Subscribe'}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {feedback && (
              <div
                id="newsletter-feedback"
                role={status === 'error' ? 'alert' : 'status'}
                className={`flex items-start gap-2 text-xs font-medium ${
                  status === 'error'
                    ? 'text-red-700 dark:text-red-400'
                    : 'text-emerald-800 dark:text-emerald-400'
                }`}
              >
                {status === 'error' ? (
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                ) : (
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                )}
                <span>{feedback}</span>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
