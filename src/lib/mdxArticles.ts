import type { ComponentType } from 'react';
import {
  calculateReadingTime,
  extractHeadingsFromMdx,
  sortArticlesByDate,
  type ArticleHeading,
  type ArticleMeta,
  type ArticleStatus,
} from './content';

interface CompiledMdxModule {
  default: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  frontmatter?: {
    title?: string;
    slug?: string;
    date?: string;
    category?: string;
    status?: ArticleStatus;
    order?: number;
    summary?: string;
    featured?: boolean;
    coverImage?: string;
    coverCaption?: string;
    externalUrl?: string;
    externalLabel?: string;
  };
}

export interface LoadedArticle extends ArticleMeta {
  Component: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  headings: ArticleHeading[];
}

const mdxModules = import.meta.glob<CompiledMdxModule>('/src/content/articles/*.mdx', {
  eager: true,
});

const mdxRawSources = import.meta.glob<string>('/src/content/articles/*.mdx', {
  query: '?raw',
  import: 'default',
  eager: true,
});

const coverImageAssets = import.meta.glob<string>('/src/assets/images/*', {
  eager: true,
  import: 'default',
});

function buildArticleCatalog(): LoadedArticle[] {
  const loaded: LoadedArticle[] = [];

  for (const [filePath, mod] of Object.entries(mdxModules)) {
    const rawSource = mdxRawSources[filePath] || '';
    const fm = mod.frontmatter || {};
    const fileSlug = filePath.split('/').pop()?.replace(/\.mdx$/, '') || 'article';
    const slug = fm.slug || fileSlug;
    const status: ArticleStatus = fm.status || 'proposed';
    const reading = calculateReadingTime(rawSource);
    const readingLabel =
      status === 'published' ? reading.label : `${reading.minutes} min outline`;
    const headings = extractHeadingsFromMdx(rawSource);

    loaded.push({
      title: fm.title || slug,
      slug,
      date: fm.date || '2026-11-14',
      category: fm.category || 'Engineering',
      status,
      order: typeof fm.order === 'number' ? fm.order : 999,
      summary: fm.summary || '',
      featured: Boolean(fm.featured),
      coverImage: fm.coverImage
        ? coverImageAssets[fm.coverImage] || fm.coverImage
        : undefined,
      coverCaption: fm.coverCaption,
      externalUrl: fm.externalUrl,
      externalLabel: fm.externalLabel,
      readingTimeMinutes: reading.minutes,
      readingTimeLabel: readingLabel,
      wordCount: reading.words,
      Component: mod.default,
      headings,
    });
  }

  // Show published articles first, then proposed drafts sorted cleanly
  return sortArticlesByDate(loaded).sort((a, b) => {
    if (a.status === 'published' && b.status !== 'published') return -1;
    if (a.status !== 'published' && b.status === 'published') return 1;
    return 0;
  });
}

export const ALL_ARTICLES: LoadedArticle[] = buildArticleCatalog();

export const PUBLISHED_ARTICLES: LoadedArticle[] = ALL_ARTICLES.filter(
  (article) => article.status === 'published'
);

export const PROPOSED_TOPICS: LoadedArticle[] = ALL_ARTICLES.filter(
  (article) => article.status !== 'published'
);

export const ARTICLE_CATEGORIES: string[] = [
  'All',
  ...Array.from(new Set(ALL_ARTICLES.map((article) => article.category))),
];

export function getArticleBySlug(slug: string): LoadedArticle | undefined {
  return ALL_ARTICLES.find((article) => article.slug === slug);
}

export function getAdjacentArticles(slug: string): {
  prev: LoadedArticle | null;
  next: LoadedArticle | null;
} {
  const index = ALL_ARTICLES.findIndex((article) => article.slug === slug);
  if (index === -1) return { prev: null, next: null };
  return {
    prev: index < ALL_ARTICLES.length - 1 ? ALL_ARTICLES[index + 1] : null,
    next: index > 0 ? ALL_ARTICLES[index - 1] : null,
  };
}
