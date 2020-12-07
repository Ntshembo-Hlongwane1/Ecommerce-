import mongoose from "mongoose";

const cartSchema = mongoose.Schema({
  cart_owner: { type: String, required: true, unique: true },
  cartList: { type: Array, required: true },
});

const cartModel = mongoose.model("cartModel", cartSchema);

export default cartModel;
