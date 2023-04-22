import mongoose from 'mongoose';
const RefObjectID = mongoose.Schema.Types.ObjectId;

export const Timestamps = new mongoose.Schema(
  {},
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  }
);

export const Author = new mongoose.Schema({
  createdBy: {
    _id: { type: RefObjectID, ref: 'User' },
    firstName: String,
    lastName: String,
  },
  updatedBy: {
    _id: { type: RefObjectID, ref: 'User' },
    firstName: String,
    lastName: String,
  },
});
