import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  picture: { type: String, required: true },
  stock_count: { type: Number, required: true },
  isOnSale: { type: Boolean, default: false },
});

const productModel = mongoose.model("productModel", productSchema);

export default productModel;
