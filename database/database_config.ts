import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'myapp.sqlite',
  logging: false // Optional: Disable Sequelize logging
});

export default sequelize;
