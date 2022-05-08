//PG database client/connection setup
const path = require("path");

const { Pool } = require("pg");
const ENV = process.env.NODE_ENV || "development";
const PATH = path.resolve(__dirname, "../.env." + ENV);

require("dotenv").config({ path: PATH });

const dbParams = {
  connectionString: process.env.DATABASE_URL || "",
  ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false
};

const db = new Pool(dbParams);

db.connect(() => {
  console.log(`database is connected to ${ENV}`);
});

module.exports = db;
