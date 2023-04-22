import mongoose from 'mongoose';
import { Timestamps } from './_common.js';
const RefObjectID = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  'Question',
  new mongoose.Schema({
    name: String,
    phone: Number,
    email: { type: String, required: true },
    content: { type: String, required: true },
    product: {
      price: {
        amount: Number,
        price: Number,
      },
      labelling: {
        _id: { type: RefObjectID, ref: 'Labelling' },
        name: String,
        company: String,
      },
      storage: {
        colors: [
          {
            _id: { type: RefObjectID, ref: 'Color' },
            name: String,
            hex: String,
          },
        ],
        amount: Number,
      },
    },
  }).add(Timestamps)
);
