import mongoose from "mongoose";

const wishListSchema = mongoose.Schema({
  owner: { type: String, required: true },
  wishlist: { type: Array, required: true },
});

const wishListModel = mongoose.model("wishlist", wishListSchema);

export default wishListModel;
