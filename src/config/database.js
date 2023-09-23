require("dotenv").config();
const database = {
  username: process.env.DB_USERNAME || "b02c2cc51def50",
  password: process.env.DB_PASSWORD || "48d930a1",
  database: process.env.DB_DATABASE || "heroku_e19019b86037df1",
  host: process.env.DB_HOST || "us-cdbr-east-06.cleardb.net",
  dialect: process.env.DB_DIALECT || "mysql",
  define: {
    underscored: true
  }
};

module.exports = database;

