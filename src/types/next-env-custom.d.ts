// Override Next.js AppRouter types to fix type errors
import 'next';

declare module 'next' {
  export interface PageProps {
    params?: Record<string, string>;
    searchParams?: Record<string, string | string[] | undefined>;
  }
}

export {};
