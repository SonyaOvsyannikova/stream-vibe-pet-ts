interface ViteTypeOptions {
    // Добавив эту строку, вы можете сделать тип ImportMetaEnv строгим,
    // чтобы запретить неизвестные ключи.
    strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
    readonly VITE_KINOPOISK_API_KEY: string
    // больше переменных окружения...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

