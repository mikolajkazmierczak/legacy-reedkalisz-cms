import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';
const RefObjectID = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  'MenuItem',
  new mongoose.Schema({
    name: String,
    parentMenuItem: {
      _id: { type: RefObjectID, ref: 'MenuItem' },
      name: String,
    },
    visible: { type: Boolean, default: true },
    image: String,
  })
    .add(Timestamps)
    .add(Author)
);
