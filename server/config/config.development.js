const dotenv =  require('dotenv');

dotenv.config({ silent: true });

const config = {
  auth: {
    disabled: true,
  },
  appName: process.env.name,
  sequelize: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
    port: process.env.POSTGRES_PORT,
  },
};

module.exports = config.sequelize

