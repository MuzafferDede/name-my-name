import mongoose from "mongoose";

//import validator from '../utils/validator.js';

export default new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "can't be blank."],
      trim: true,
    },
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  { timestamps: true }
);
