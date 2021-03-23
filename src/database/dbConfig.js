const config = {
    user: process.env.DB_USER || "sa",
    password: process.env.DB_PASSWORD || "sa",
    server: process.env.SERVER_ADDR || 'localhost',
    database: process.env.DATABASE || "test",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
}

module.exports = config;