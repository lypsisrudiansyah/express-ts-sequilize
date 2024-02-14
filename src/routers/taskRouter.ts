import { Router } from 'express';
import { index, store } from '../controllers/taskController';

const router = Router();
router.get('/tasks', index);
router.post('/tasks', store);

export default router;