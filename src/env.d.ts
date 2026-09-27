/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DEPLOY_TARGET: 'production' | 'preview';
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
