import express from 'express';
import { createTask, getAvailableTasks, assignTask } from '../controllers/taskController';
import { protect, authorize } from '../middleware/authMiddleware';

const router = express.Router();


router.post('/', protect, authorize('ADMIN'), createTask);

router.get('/available', protect, getAvailableTasks);

router.post('/:id/assign', protect, assignTask);

export default router;