import { TaskModel } from '../models/taskModel';
import { Request, Response } from 'express';

export const index = async (req: Request, res: Response) => {
  try {
    const tasks = [
      { id: 1, title: "Task 1", completed: false, dueDate: new Date() },
      { id: 2, title: "Task 2", completed: true, dueDate: new Date() },
      { id: 3, title: "Task 3", completed: false, dueDate: new Date() },
    ];
    res.json(tasks);
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).send('Error getting tasks');
  }
};

export const store = async (req: Request, res: Response) => {
  const { title, completed, dueDate } = req.body;
  try {
    const newTask = { title, completed, dueDate, message: "Task Created" };
    res.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Error creating task');
  }
};

export const update = async (req: Request, res: Response) => {
  const { title, completed, dueDate } = req.body;
  try {
    const updatedTask = { title, completed, dueDate, message: "Task Updated" };
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Error updating task');
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const message = { message: "Task Deleted" };
    res.json(message);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Error deleting task');
  }
};