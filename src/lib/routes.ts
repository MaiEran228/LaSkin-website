import { LANGS, DEFAULT_LANG, type Lang } from '../i18n';

export type RouteKey = 'home' | 'studies' | 'areas' | 'locality' | 'privacy' | 'accessibility';

/** Path of each route below the language prefix (always with a trailing slash). */
export const ROUTE_PATH: Record<RouteKey, string> = {
  home: '',
  studies: 'clinical-studies/',
  areas: 'areas/',
  locality: 'areas/mevaseret-zion/',
  privacy: 'privacy/',
  accessibility: 'accessibility/',
};

/** Indexing policy. The areas index is a plain list without unique local content, so it stays noindex. */
export const INDEXABLE: Record<RouteKey, boolean> = {
  home: true, studies: true, areas: false, locality: true, privacy: true, accessibility: true,
};

export const IS_PREVIEW = import.meta.env.DEPLOY_TARGET === 'preview';
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
export const ORIGIN = (import.meta.env.SITE || 'https://laskin.co.il').replace(/\/$/, '');

/** Site-relative path without the deployment base, e.g. "/he/privacy/". */
export const pagePath = (lang: Lang, route: RouteKey) => `/${lang}/${ROUTE_PATH[route]}`;
/** Href for use in markup (includes the deployment base when previewing on a sub-path). */
export const href = (lang: Lang, route: RouteKey) => `${BASE}${pagePath(lang, route)}`;
/** Any public path (e.g. "/og-image.jpg") with the deployment base applied. */
export const withBase = (path: string) => `${BASE}${path}`;
/** Absolute URL used for canonical / hreflang / sitemap. */
export const absoluteUrl = (lang: Lang, route: RouteKey) => `${ORIGIN}${BASE}${pagePath(lang, route)}`;

export const alternates = (route: RouteKey) => [
  ...LANGS.map((lang) => ({ hreflang: lang as string, href: absoluteUrl(lang, route) })),
  { hreflang: 'x-default', href: absoluteUrl(DEFAULT_LANG, route) },
];

export interface RouteEntry { lang: Lang; route: RouteKey; path: string; indexable: boolean; canonical: string }

export const routeInventory = (): RouteEntry[] =>
  LANGS.flatMap((lang) =>
    (Object.keys(ROUTE_PATH) as RouteKey[]).map((route) => ({
      lang, route, path: pagePath(lang, route), indexable: INDEXABLE[route] && !IS_PREVIEW, canonical: absoluteUrl(lang, route),
    })),
  );
