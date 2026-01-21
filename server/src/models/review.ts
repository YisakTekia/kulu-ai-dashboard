import mongoose, { Document, Schema } from 'mongoose';

export interface IReview extends Document {
  submissionId: mongoose.Types.ObjectId;
  supervisorId: mongoose.Types.ObjectId;
  decision: 'ACCEPTED' | 'REJECTED';
  comment?: string;
}

const ReviewSchema: Schema = new Schema(
  {
    submissionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Submission', required: true, unique: true },
    supervisorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    decision: { 
      type: String, 
      enum: ['ACCEPTED', 'REJECTED'], 
      required: true 
    },
    comment: { type: String }
  },
  { timestamps: { createdAt: 'reviewedAt', updatedAt: false } }
);

export default mongoose.model<IReview>('Review', ReviewSchema);