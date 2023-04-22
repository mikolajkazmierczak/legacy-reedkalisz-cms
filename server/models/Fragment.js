import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';

export default mongoose.model(
  'Fragment',
  new mongoose.Schema({
    name: { type: String, unique: true },
    content: String,
  })
    .add(Timestamps)
    .add(Author)
);
