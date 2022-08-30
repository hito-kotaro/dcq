require('dotenv').config();
const ssl = process.env.ENV === 'prod' ? { rejectUnauthorized: true } : '';
config = {
  dialect: process.env.DB_DIARECT,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  logging: false,
  dialectOptions: {
    ssl,
  },
};
module.exports = config;
