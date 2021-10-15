const mongoose = require('mongoose');
const RefObjectID = mongoose.Schema.Types.ObjectId;
const AuthorSchema = require('./author');
const TimestampsSchema = require('./timestamps');

module.exports = mongoose.model(
  'Product',
  new mongoose.Schema({
    // Publication
    published: { type: Boolean, default: false },
    published_enable_at: Date,
    // Main
    title: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    new: { type: Boolean, default: false },
    new_disable_at: Date,
    category: {
      _id: { type: RefObjectID, ref: 'Category' },
      code: String,
      title: String,
    },
    // SEO
    seo_title: { type: String, default: () => this.title },
    seo_description: { type: String, default: () => this.title },
    seo_keywords: { type: String, default: () => this.title },
    // Price
    amounts: [Number],
    labelling: String,
    // Images
    images: [String],
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
    // Description
    description: String,
  })
    .add(AuthorSchema)
    .add(TimestampsSchema)
);
