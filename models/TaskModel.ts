import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'tasks',
})
export class TaskModel extends Model<TaskModel> {
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
