import { Sequelize } from 'sequelize';
// import { TaskMode } from '../models/taskModel';

const sequelize = new Sequelize(
  'testdb', 'user', 'password',
  {
  dialect: 'sqlite',
  // database: './myapp.sqlite',
  host: './myapp.sqlite',
  logging: false,
});

export default sequelize;
