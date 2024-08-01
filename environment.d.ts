declare namespace NodeJS {
    interface ProcessEnv {
        API_PORT: string;
        DATABASE_URI: string;
        ALLOWED_ORIGIN: string;
        NODE_ENV?: 'development' | 'test' | 'production' | undefined;
    }
}