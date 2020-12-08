import express from "express";
import cartController from "../../Controller/Cart/CartController";

const router = express.Router();
const CartController = new cartController();

router.get("/api/get-cart", (request, response) => {
  CartController.GetUserCart(request, response);
});

router.post("/api/add-to-cart", (request, response) => {
  CartController.AddNewItem(request, response);
});

router.post("/api/remove-from-cart", (request, response) => {
  CartController.DeleteCartItem(request, response);
});

export default router;
