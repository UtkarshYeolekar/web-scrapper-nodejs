const config = {
    //user: process.env.DB_USER || "",
    //password: process.env.DB_PASSWORD || "sa",
    server: process.env.SERVER_ADDR || 'localhost',
    driver: "msnodesqlv8",
    database: process.env.DATABASE || "test",
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        trustedConnection: true,
        enableArithAbort: true
      }
}

module.exports = config;