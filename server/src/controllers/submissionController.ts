import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Submission from '../models/submission';
import Task from '../models/task';

export const submitWork = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { contentText, audioFileUrl } = req.body;
    const taskId = req.params.taskId;
    const userId = req.user?._id;

   
    const task = await Task.findById(taskId);
    if (!task || !task.isActive) {
      res.status(404).json({ message: 'Task not found or inactive' });
      return;
    }

    
    const existingSubmission = await Submission.findOne({ taskId, userId });
    if (existingSubmission) {
      res.status(400).json({ message: 'You have already submitted for this task.' });
      return;
    }

   
    const submission = await Submission.create({
      taskId,
      userId,
      contentText,   
      audioFileUrl,  
      status: 'PENDING' 
    });

    res.status(201).json(submission);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// @desc    Get my submissions
// @route   GET /api/submissions/my
export const getMySubmissions = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const submissions = await Submission.find({ userId: req.user?._id })
                                        .populate('taskId', 'sourceText taskType');
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}