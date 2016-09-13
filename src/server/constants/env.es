
export const EXPRESS_PORT = 8081;

export const DB_SETTINGS = {
    uri: 'mongodb://localhost:27017/google-maps-news',
    options: {
        db: { native_parser: true },
        server: { poolSize: 5 }
    }
};