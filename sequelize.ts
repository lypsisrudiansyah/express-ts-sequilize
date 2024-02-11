import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'my-database.db',
  logging: false // Optional: Disable Sequelize logging
});

export default sequelize;
