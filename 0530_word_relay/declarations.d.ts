declare global { 
    namespace NodeJS {
        interface ProcessEnv {
            readonly TOKEN: string;
            readonly APP_ID: string;
        }
    }
}

export { };