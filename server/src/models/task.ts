import mongoose, { Document, Schema } from 'mongoose';

export interface ITask extends Document {
  taskType: 'TRANSLATION' | 'RECORDING' | 'TRANSCRIPTION';
  sourceText?: string;
  audioUrl?: string;
  videoUrl?: string;
  language: 'AMHARIC' | 'TIGRIGNA' | 'AFAAN_OROMO';
  maxUsers: number;
  createdBy: mongoose.Types.ObjectId;
  isActive: boolean;
}

const TaskSchema: Schema = new Schema(
  {
    taskType: { 
      type: String, 
      enum: ['TRANSLATION', 'RECORDING', 'TRANSCRIPTION'], 
      required: true 
    },
    sourceText: { type: String },
    audioUrl: { type: String },
    videoUrl: { type: String },
    language: { 
      type: String, 
      enum: ['AMHARIC', 'TIGRIGNA', 'AFAAN_OROMO'], 
      required: true 
    },
    maxUsers: { type: Number, default: 1 },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model<ITask>('Task', TaskSchema);