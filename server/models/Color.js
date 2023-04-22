import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';

export default mongoose.model(
  'Color',
  new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    hex: { type: String, unique: true, required: true },
  })
    .add(Timestamps)
    .add(Author)
);
