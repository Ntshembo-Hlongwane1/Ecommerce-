import Formidable from "formidable";
import Cloudinary from "cloudinary";
import productModel from "../../Models/Products/Products";
import dotenv from "dotenv";
dotenv.config();

const cloudinary = Cloudinary.v2;
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

class ProductsController {
  AddNewProduct(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to add new product" });
        }

        const { name, description, price, category, stock_count } = fields;
        const { picture } = files;

        if (
          !name ||
          !description ||
          !price ||
          !category ||
          !stock_count ||
          !picture
        ) {
          return response
            .status(400)
            .json({ msg: "All fields are required to add new product" });
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(
          picture.path,
          { folder: `/Ecommerce/Clothes/${category}` }
        );

        if (!cloudinaryResponse) {
          return response.status(500, {
            msg:
              "Network Error: Failed to upload product image check file format",
          });
        }

        const image_url = cloudinaryResponse.secure_url;

        const newProduct = new productModel({
          name,
          description,
          price,
          category,
          stock_count,
          picture: image_url,
        });

        const savedProduct = newProduct.save();

        return response.status(201).json({ msg: "New Product has been added" });
      });
    } catch (error) {
      return response.status(500, { msg: "Error: Failed to add new product" });
    }
  }

  async FetchProductList(request, response) {
    const category = request.params.category;

    try {
      const data = await productModel.find({ category: category });

      return response.status(200).json(data);
    } catch (error) {
      return response.status(500).json({
        msg: `Network Error: Failed to get ${category} try again later`,
      });
    }
  }

  async GetProductDetails(request, response) {
    const category = request.params.category;
    const productID = request.params.id;

    try {
      const data = await productModel.findOne({
        category: category,
        _id: productID,
      });
      return response.status(200).json(data);
    } catch (error) {
      return response.status(500, {
        msg: "Network Error: Failed to retrive product details",
      });
    }
  }
}

export default ProductsController;
