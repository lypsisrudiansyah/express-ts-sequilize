import TaskModel from '../models/taskModel';
import { Request, Response } from 'express';

export const index = async (req: Request, res: Response) => {
  try {
    TaskModel.create({ title: "Task 1", completed: false, dueDate: new Date() });
    TaskModel.create({ title: "Task 2", completed: false, dueDate: new Date() });
    TaskModel.create({ title: "Task 3", completed: false, dueDate: new Date() });
    /* const tasks = [
      { id: 1, title: "Task 1", completed: false, dueDate: new Date() },
      { id: 2, title: "Task 2", completed: true, dueDate: new Date() },
      { id: 3, title: "Task 3", completed: false, dueDate: new Date() },
    ]; */
    let page = typeof req.query?.page === 'string' ? parseInt(req.query.page) : 1;

    const pageSize = 5; // number of items per page
    const currentPage = page;

    let tasks = await TaskModel.findAll({
      limit: pageSize,
      offset: pageSize * (currentPage - 1),
    });

    res.json({
      message: "Tasks retrieved successfully",
      search: req.query?.search, data: tasks,
      currentPage: currentPage,
      nextPageUrl: tasks.length === pageSize ? `${req.headers?.host}/api/tasks?page=${currentPage + 1}` : null,
      previousPageUrl: currentPage > 1 ? `${req.headers?.host}/api/tasks?page=${currentPage - 1}` : null,
      headers: req.headers
    });
  } catch (error) {
    console.error('Error getting tasks:', error);
    res.status(500).json({ 'message': 'Error getting tasks' });
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const task = { id: parseInt(req.params?.id), title: `Task ID from Params : ${req.params?.id} }`, completed: false, dueDate: new Date() };
    res.json(task);
  } catch (error) {
    console.error('Error getting task:', error);
    res.status(500).json({ 'message': 'Error getting task' });
  }
};

export const store = async (req: Request, res: Response) => {
  console.log(req.body);

  // * Destructuring
  const { title, completed, dueDate } = req.body;
  try {
    const newTask = { message: "Task Created Dummy", data: { title, completed, dueDate } };
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ 'message': 'Error creating task' });
  }
};

export const update = async (req: Request, res: Response) => {
  const { title, completed, dueDate } = req.body;
  try {
    const updatedTask = { title, completed, dueDate, message: "Task Updated" };
    res.json(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).json({ 'message': 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const message = { message: "Task Deleted" };
    res.json(message);
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ 'message': 'Error deleting task' });
  }
};