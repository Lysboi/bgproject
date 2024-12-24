/// <reference types="vite/client" />

// Vite ortam değişkenleri için tip tanımlamaları
declare module 'vite/client' {
  interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    readonly MODE: string
    readonly DEV: boolean
    readonly PROD: boolean
    readonly SSR: boolean
  }
} 