import { Router } from 'express';
import { index, show, store, update } from '../controllers/taskController';

const router = Router();
router.get('/tasks', index);
router.post('/tasks', store);
router.post('/tasks/:id', update);
router.get('/tasks/:id', show);

export default router;