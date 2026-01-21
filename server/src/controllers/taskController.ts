import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Task from '../models/task';
import TaskAssignment from '../models/taskAssignment';
import Submission from '../models/submission';

// 1. Create Task (Admin Only) [cite: 114-117]
export const createTask = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { taskType, sourceText, audioUrl, videoUrl, language, maxUsers } = req.body;

    const task = await Task.create({
      taskType,
      sourceText, 
      audioUrl,
      videoUrl,
      language,
      maxUsers: maxUsers || 1, 
      createdBy: req.user?._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// 2. Get Available Tasks (For Users) [cite: 73]
export const getAvailableTasks = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userLanguages = req.user?.languages || [];
    const userId = req.user?._id;

    
    const tasks = await Task.find({
      isActive: true,
      language: { $in: userLanguages }
    }).lean();

    const availableTasks = [];

    for (const task of tasks) {
       
        const hasSubmitted = await Submission.exists({ taskId: task._id, userId });
        if (hasSubmitted) continue;

        
        const assignmentsCount = await TaskAssignment.countDocuments({ taskId: task._id });
        if (assignmentsCount < task.maxUsers) {
            availableTasks.push(task);
        }
    }

    res.json(availableTasks);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

// 3. Assign Task (Claim a task) [cite: 478-484]
export const assignTask = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const taskId = req.params.id;
        const userId = req.user?._id;

        const task = await Task.findById(taskId);
        if (!task || !task.isActive) {
             res.status(404).json({ message: 'Task not found or inactive' });
             return;
        }

        //  [cite: 480]
        const currentAssignments = await TaskAssignment.countDocuments({ taskId });
        if (currentAssignments >= task.maxUsers) {
             res.status(400).json({ message: 'Task capacity reached' });
             return;
        }

        
        const alreadyAssigned = await TaskAssignment.findOne({ taskId, userId });
        if (alreadyAssigned) {
            res.status(400).json({ message: 'Task already assigned to you' });
            return;
        }

        await TaskAssignment.create({ taskId, userId });
        res.status(201).json({ message: 'Task assigned successfully' });

    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}