import { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface EditorialImageProps {
  src?: string;
  alt: string;
  aspectClassName?: string;
  className?: string;
  imgClassName?: string;
  caption?: string;
  priority?: boolean;
}

export function EditorialImage({
  src,
  alt,
  aspectClassName = 'aspect-[16/9]',
  className = '',
  imgClassName = 'object-cover',
  caption,
  priority = false,
}: EditorialImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative w-full overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] ${aspectClassName}`}
      >
        {src && !hasError ? (
          <img
            src={src}
            alt={alt}
            referrerPolicy="no-referrer"
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onError={() => setHasError(true)}
            className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.015] ${imgClassName}`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[var(--bg-surface)] to-[var(--bg-canvas)] p-6 text-center">
            <ImageIcon className="h-6 w-6 text-[var(--text-muted)]" aria-hidden="true" />
            <span className="max-w-xs text-xs font-medium text-[var(--text-secondary)]">
              {alt}
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2.5 font-serif text-xs italic text-[var(--text-muted)]">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
