const mongoose = require('mongoose');
const slugify = require('slugify');

const DreamSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a title'],
    unique: true,

    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  slug: String,
  description: {
    type: String,

    required: [true, 'Please add a description'],
    maxlength: [500, 'Description can not be more than 500 characters'],
  },
  type: {
    //? Array of strings
    type: String,
    required: true,
    enum: ['happy', 'sad', 'exciting', 'scary'],
  },
});

// Create dream slug from the name
DreamSchema.pre('save', function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

module.exports = mongoose.model('Dream', DreamSchema);
