import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  database: 'myapp.sqlite',
  logging: false,


});


export default sequelize;
