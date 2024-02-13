import { TaskModel } from '../models/taskModel'; // Adjust path if needed

export const createTask = async (req, res) => {
  const { title, completed, dueDate } = req.body;
  try {
    const newTask = await TaskModel.create({ title, completed, dueDate });
    res.json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Error creating task');
  }
};