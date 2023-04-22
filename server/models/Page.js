import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';

export default mongoose.model(
  'Page',
  new mongoose.Schema({
    name: { type: String, required: true },
    content: String,
  })
    .add(Timestamps)
    .add(Author)
);
