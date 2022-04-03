const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    slackId: {
      type: String,
      required: [true, "can't be blank."],
      trim: true,
    },
    items: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", schema);
