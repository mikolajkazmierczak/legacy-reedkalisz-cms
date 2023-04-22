import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';

export default mongoose.model(
  'Slide',
  new mongoose.Schema({
    pos: { type: Number, required: true, unique: true },
    src: { type: String, required: true },
    name: String,
  })
    .add(Timestamps)
    .add(Author)
);
