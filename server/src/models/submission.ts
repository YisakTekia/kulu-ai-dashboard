import mongoose, { Document, Schema } from 'mongoose';

export interface ISubmission extends Document {
  taskId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  contentText?: string;
  audioFileUrl?: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

const SubmissionSchema: Schema = new Schema(
  {
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    contentText: { type: String },
    audioFileUrl: { type: String },
    status: {
      type: String,
      enum: ['PENDING', 'ACCEPTED', 'REJECTED'],
      default: 'PENDING'
    }
  },
  { timestamps: true }
);


SubmissionSchema.index({ taskId: 1, userId: 1 }, { unique: true });

export default mongoose.model<ISubmission>('Submission', SubmissionSchema);