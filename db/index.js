const Pool = require("pg").Pool;

//insures that the .env file is only run in a development environment and not a production environment
if (process.env.NODE_ENV !== "production") {
  //requires the the .env file configuration be run first hiding all info hidden via the .env file
  require("dotenv").config();
}

// Database configuration for development environment
const devConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
};

// Database configuration for production environment
const prodConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Set the database configuration based on the current environment
const pool = new Pool(
  process.env.NODE_ENV === "production" ? prodConfig : devConfig
);

// Export PostgreSQL database query
module.exports = {
  query: (text, params) => {
    return pool.query(text, params);
  },
};
