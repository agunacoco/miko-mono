/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_LARAVEL_URL: string;
  readonly VITE_NEST_URL: string;
  readonly VITE_SOCKET_SERVER: string;
  readonly VITE_IVS_S3: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
declare global {
  interface Window {
    socket: Socket;
    IVSPlayer: typeof ivs;
  }

  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      ESLINT_NO_DEV_ERRORS: string;
      VITE_LARAVEL_URL: string;
      VITE_NEST_URL: string;
      VITE_SOCKET_SERVER: string;
      VITE_IVS_S3: string;
      DISABLE_ESLINT_PLUGIN: string;
    }
  }
}
