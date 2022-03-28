const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    slackID: {
      type: String,
      required: [true, "can't be blank."],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
