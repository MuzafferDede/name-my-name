import mongoose from "mongoose";
import productSchema from "../schemas/product.js";

export default mongoose.model("Product", productSchema);
