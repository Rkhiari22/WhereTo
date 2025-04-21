const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true
    },
    name :{
        type: String,
        required: true,
        max: 40
    },
    description: {
      type: String,
      required: true,
      maxlength: 1024
    },
    categorie: {
      type: String,
      required: true,
      maxlength: 50
    },
    picture: {
      type: [String],
      required: true
    },
    video: {
      type: String
    },
    prix: {
      type: String,
      required: true,
      maxlength: 10
    },
    likers: {
      type: [String],
      required: true,
    },
    comments: {
      type: [
        {
          commenterId:String,
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

module.exports = mongoose.model('area', areaSchema);