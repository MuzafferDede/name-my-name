const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank."],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "can't be blank."],
      trim: true,
    },
    tag: {
      type: String,
      trim: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Item", schema);
