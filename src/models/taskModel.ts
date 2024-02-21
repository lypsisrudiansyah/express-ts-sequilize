/* import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table
export class TaskModel extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  completed!: boolean;

  @Column({
    type: DataType.DATE, 
    allowNull: false,
  })
  dueDate?: Date;
}
 */
import { DataTypes, Model } from 'sequelize';
import sequelize from '../database/database_config';

class TaskModel extends Model {
  public id!: number;
  public title!: string;
  public completed!: boolean;
  public image?: string;
  public dueDate!: Date;
}

TaskModel.init({
  id: {
    type: DataTypes.INTEGER,
    // type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  image: {
    type: new DataTypes.STRING(128),
    allowNull: true,
  },
  dueDate: {
    type: new DataTypes.DATE,
    allowNull: false,
  }
}, {
  tableName: 'tasks',
  sequelize: sequelize, // this bit is important
});

export default TaskModel;