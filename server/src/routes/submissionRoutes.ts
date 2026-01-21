import express from 'express';
import { submitWork, getMySubmissions } from '../controllers/submissionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();


router.post('/:taskId', protect, submitWork);


router.get('/my', protect, getMySubmissions);

export default router;