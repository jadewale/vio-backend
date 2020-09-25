import Umzug from 'umzug';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({
  silent: true,
});

const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line import/no-dynamic-require
const config = require(`${__dirname}/../config/config.${env}.js`);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

const migrator = new Umzug({
  logging: false,
  migrations: {
    path: `${__dirname}`,
    params: [
      sequelize.getQueryInterface(),
      Sequelize,
    ],
  },
  storage: 'sequelize',
  storageOptions: { sequelize },
});

export default migrator;
