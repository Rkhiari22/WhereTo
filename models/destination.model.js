const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true,
      max: 40
    },
    description: {
      type: String,
      required: true,
      maxlength: 1024
    },
    address: {
      type: String,
      required: true
    },
    categorie: {
      type: String,
      required: true,
      enum: [
        'Nature',
        'Restaurants & Bars',
        'Jeux & Loisirs',
        'Culture',
        'Vie Nocturne'
      ]
    },
    picture: {
      type: [String],
      required: true,
    },
    video: {
      type: String
    },
    priceRange: {
      min: Number,
      max: Number
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamp: Number,
        }
      ],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('destination', destinationSchema);