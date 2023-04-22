import mongoose from 'mongoose';
import { Timestamps, Author } from './_common.js';
const RefObjectID = mongoose.Schema.Types.ObjectId;

export default mongoose.model(
  'Product',
  new mongoose.Schema({
    // Publication
    published: { type: Boolean, default: false },
    publishedEnableAt: Date,
    new: { type: Boolean, default: false },
    newDisableAt: Date,
    // Main
    name: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    codename: { type: String, required: true },
    description: String,
    category: {
      _id: { type: RefObjectID, ref: 'Category' },
      name: String,
      code: String,
    },
    // SEO
    seoTitle: { type: String, default: () => this.title },
    seoDescription: { type: String, default: () => this.title },
    seoKeywords: { type: String, default: () => this.title },
    // Price
    prices: [
      {
        amount: Number,
        price: Number,
      },
    ],
    labelling: {
      _id: { type: RefObjectID, ref: 'Labelling' },
      name: String,
      company: String,
    },
    // Images
    images: [
      {
        image: String,
        visible: { type: Boolean, default: true },
      },
    ],
    // Storage
    storage: [
      {
        colors: [
          {
            _id: { type: RefObjectID, ref: 'Color' },
            name: String,
            hex: String,
          },
        ],
        amount: Number,
        image: String,
      },
    ],
    // Recommended
    recommendedProducts: [{ type: RefObjectID, ref: 'Product' }],
    recommendedCategories: [{ type: RefObjectID, ref: 'Category' }],
  })
    .add(Timestamps)
    .add(Author)
);
