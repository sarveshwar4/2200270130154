const mongoose = require("mongoose");

const shortURLSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortcode: {
    type: String,
    required: true,
    unique: true,
  },
  expiryAt: {
    type: Date,
    required: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  clickStats: [
    {
      timestamp: Date,
      referrer: String,
      geo: String,
    },
  ],
});

module.exports = mongoose.model("ShortURL", shortURLSchema);
