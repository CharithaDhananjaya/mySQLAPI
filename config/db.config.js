const db = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "password",
    DATABASE: "mydb",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}

module.exports = db;
