import Formidable from "formidable";
import productModel from "../../Models/Products/Products";

const validateProductID = (request, response, next) => {
  const form = new Formidable.IncomingForm();

  form.parse(request, async (error, fields, files) => {
    if (error) {
      return response
        .status(500)
        .json({ msg: "Network Error: Failed to add item to cart" });
    }

    const { productID } = fields;

    const isProductAvailable = await productModel.findOne({ _id: productID });

    if (!isProductAvailable) {
      return response.status(404).json({ msg: "Product not avaialable" });
    }
    next();
  });
};
