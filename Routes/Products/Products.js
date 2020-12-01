import express from "express";
import productController from "../../Controller/Products/ProductsController";

const router = express.Router();
const ProductsController = new productController();

router.post("/api/add-new-product", (request, response) => {
  ProductsController.AddNewProduct(request, response);
});

router.get("/api/fetch-products/:category", (request, response) => {
  ProductsController.FetchProductList(request, response);
});

export default router;
