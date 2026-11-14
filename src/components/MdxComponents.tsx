import { useState, type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { Check, Copy } from 'lucide-react';
import { slugifyHeading } from '../lib/content';

function extractText(children: ReactNode): string {
  if (typeof children === 'string' || typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(extractText).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as { props?: { children?: ReactNode } }).props?.children);
  }
  return '';
}

function PreBlock({ children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const text = extractText(children);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Ignore clipboard denial
    }
  }

  return (
    <div className="group relative my-7">
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Code copied' : 'Copy code snippet'}
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 rounded border border-[var(--border-hairline)] bg-[var(--bg-elevated)] px-2.5 py-1 font-mono text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            <span>Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" aria-hidden="true" />
            <span>Copy</span>
          </>
        )}
      </button>
      <pre
        {...props}
        className="overflow-x-auto rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-5 pt-11 font-mono text-[13px] leading-relaxed text-[var(--text-primary)]"
      >
        {children}
      </pre>
    </div>
  );
}

export const mdxComponents = {
  h2: ({ children, ...props }: ComponentPropsWithoutRef<'h2'>) => {
    const id = slugifyHeading(extractText(children));
    return (
      <h2
        id={id}
        {...props}
        className="mt-12 mb-4 scroll-mt-24 font-serif text-2xl sm:text-[1.65rem] font-medium tracking-tight text-[var(--text-primary)]"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: ComponentPropsWithoutRef<'h3'>) => {
    const id = slugifyHeading(extractText(children));
    return (
      <h3
        id={id}
        {...props}
        className="mt-8 mb-3 scroll-mt-24 font-sans text-lg font-semibold tracking-tight text-[var(--text-primary)]"
      >
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p {...props} className="mb-5 leading-[1.78] text-[var(--text-primary)]">
      {children}
    </p>
  ),
  ul: ({ children, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul {...props} className="mb-6 list-disc pl-6 space-y-2 text-[var(--text-primary)]">
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol {...props} className="mb-6 list-decimal pl-6 space-y-2 text-[var(--text-primary)]">
      {children}
    </ol>
  ),
  li: ({ children, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li {...props} className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      {...props}
      className="my-8 border-y border-[var(--border-hairline)] py-5 font-serif text-xl sm:text-2xl italic leading-snug text-[var(--text-primary)] [&>p]:mb-0"
    >
      {children}
    </blockquote>
  ),
  pre: PreBlock,
  code: ({ children, className, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code {...props} className={`font-mono ${className || ''}`}>
          {children}
        </code>
      );
    }
    return (
      <code
        {...props}
        className="rounded border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-1.5 py-0.5 font-mono text-[0.875em] text-[var(--text-primary)]"
      >
        {children}
      </code>
    );
  },
  a: ({ children, href, ...props }: ComponentPropsWithoutRef<'a'>) => (
    <a
      href={href}
      {...props}
      className="text-[var(--accent-primary)] underline decoration-[var(--accent-primary)]/40 underline-offset-4 hover:decoration-[var(--accent-primary)] transition-colors"
    >
      {children}
    </a>
  ),
  hr: () => <hr className="my-10 border-t border-[var(--border-hairline)]" />,
};
