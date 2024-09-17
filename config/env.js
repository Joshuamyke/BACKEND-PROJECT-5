const dotenv = require('dotenv');

dotenv.config();

module.exports = {
   MONGODB_URL: process.env.MONGODB_URL,
   ACCESS_TOKEN: process.env.ACCESS_TOKEN,
   PORT: process.env.PORT,
};