import mongoose, { Document, Schema } from 'mongoose';

export interface ITaskAssignment extends Document {
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const TaskAssignmentSchema: Schema = new Schema(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: 'assignedAt', updatedAt: false } }
);

export default mongoose.model<ITaskAssignment>('TaskAssignment', TaskAssignmentSchema);