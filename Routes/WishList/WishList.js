import express from "express";
import wishListController from "../../Controller/WishList/WishListController";

const router = express.Router();
const WishListController = new wishListController();

router.post("/api/add-wishlist-item", (request, response) => {
  WishListController.AddItem(request, response);
});

export default router;
