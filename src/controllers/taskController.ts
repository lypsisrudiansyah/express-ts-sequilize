import TaskModel from '../models/taskModel';
import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import { Op } from 'sequelize';

// const upload = multer({ dest: 'public/storage/uploads/' });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('req:', req.body);
    cb(null, 'public/storage/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
  }
})

const upload = multer({ storage: storage });

export const index = async (req: Request, res: Response) => {
  try {
    // TaskModel.create({ title: "Task 1", completed: false, dueDate: new Date() });
    // TaskModel.create({ title: "Task 2", completed: false, dueDate: new Date() });
    // TaskModel.create({ title: "Task 3", completed: false, dueDate: new Date() });
    TaskModel.destroy({ where: { id: { [Op.gte]: 19 } } });
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
  console.log("Induk", req.body);
  const { id } = req.params; // Get the task ID from the request parameters

  try {
    let imageFilename: string | undefined = undefined;

    await upload.single('image')(req, res, async (err) => {
      if (err) {
        // Handle the error
        console.error(err);
        return res.status(500).json({ 'message': 'Error updating task' });

        // return;
      } else {
        const { title, completed, dueDate } = req.body;

        imageFilename = req.file?.filename;
        let task = await TaskModel.findByPk(id);
        const imagePath = imageFilename ? `public/storage/uploads/${imageFilename}` : task?.image;

        TaskModel.update({ title, completed, dueDate, image: imagePath }, { where: { id } });
      }
    });

    /* if (numberOfAffectedRows > 0) {
      const updatedTask = affectedRows[0];
      res.json({ ...updatedTask, message: "Task Updated" });
    } else {
      res.status(404).json({ message: 'Task not found' });
    } */
    return res.json({ message: "Task Updated" });
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