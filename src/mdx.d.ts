/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { ComponentType } from 'react';
  export interface MdxFrontmatter {
    title: string;
    slug: string;
    date: string;
    category: string;
    summary: string;
    status?: 'published' | 'proposed' | 'draft';
    featured?: boolean;
    coverImage?: string;
    coverCaption?: string;
    externalUrl?: string;
    externalLabel?: string;
    order?: number;
  }
  export const frontmatter: MdxFrontmatter;
  const MDXContent: ComponentType<{ components?: Record<string, ComponentType<any>> }>;
  export default MDXContent;
}
