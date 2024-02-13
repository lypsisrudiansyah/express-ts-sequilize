import { TaskModel } from '../models/taskModel';
import { Request, Response } from 'express';

export const createTask = async (req: Request, res: Response) => {
  const { title, completed, dueDate } = req.body;
  try {
    const newTask = await TaskModel.create({ title, completed, dueDate });
    res.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Error creating task');
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = "Good to go";
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).send('Error getting tasks');
  }
};