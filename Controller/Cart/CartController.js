import Formidable from "formidable";
import cartModel from "../../Models/Cart/Cart";

class CartController {
  AddNewItem(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg: "Network Error: Failed to add item to cart try again later",
          });
        }

        const {
          productName,
          productID,
          productImage,
          productPrice,
          Qty,
        } = fields;

        if (
          !productID ||
          !productName ||
          !productImage ||
          !productPrice ||
          !Qty
        ) {
          return response
            .status(400)
            .json({ msg: "Product missing details, cannot be added to cart" });
        }
      });
    } catch (error) {
      return response.status(500, {
        msg: "Network Error: Failed to add item to cart try again later",
      });
    }
  }
}
