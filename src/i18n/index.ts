import type { Dict, Lang } from './types';
import { he } from './he';
import { en } from './en';
import { ar } from './ar';

export type { Dict, Lang } from './types';
export const LANGS: readonly Lang[] = ['he', 'ar', 'en'] as const;
export const DEFAULT_LANG: Lang = 'he';
export const dictionaries: Record<Lang, Dict> = { he, en, ar };
export const t = (lang: Lang): Dict => dictionaries[lang];
export const isLang = (x: string): x is Lang => (LANGS as readonly string[]).includes(x);
