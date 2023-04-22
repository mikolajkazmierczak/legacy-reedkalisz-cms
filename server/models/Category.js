import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';
const RefObjectID = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  'Category',
  new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    code: { type: [Number], unique: true, required: true },
    codename: { type: String, unique: true, required: true },
    parent: {
      _id: { type: RefObjectID, ref: 'Category' },
      name: String,
      code: [Number],
    },
    description: String,
    image: String,
  })
    .add(Timestamps)
    .add(Author)
);
