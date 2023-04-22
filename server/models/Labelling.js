import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';

export default mongoose.model(
  'Labelling',
  new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    category: { type: String, required: true },
    company: { type: String, required: true },
    prices: [
      {
        amount: { from: Number, to: Number },
        price: Number,
      },
    ],
  })
    .add(Timestamps)
    .add(Author)
);
