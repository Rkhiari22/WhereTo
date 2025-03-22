const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema(
  {
    areaId: {
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
    picture: {
      type: [String],
      required: true
    },
    video: {
      type: String
    },
    rate: {
      type: String,
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