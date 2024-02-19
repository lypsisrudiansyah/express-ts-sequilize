import { Router } from 'express';
import { index, show, store } from '../controllers/taskController';

const router = Router();
router.get('/tasks', index);
router.post('/tasks', store);
router.get('/tasks/:id', show);

export default router;