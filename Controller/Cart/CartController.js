import Formidable from "formidable";
import cartModel from "../../Models/Cart/Cart";

class CartController {
  AddNewItem(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
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

        const userSession = request.session.user;
        const userEmail = userSession.userMail;

        const userCart = await cartModel.findOne({ cart_owner: userEmail });
        const qty = Qty === 0 ? 1 : Qty;
        if (!userCart) {
          const newCart = {
            cart_owner: userEmail,
            cart: {
              productID,
              productName,
              productImage,
              productPrice,
              Qty: qty,
            },
          };

          const cart = new cartModel(newCart);
          const savedCard = await cart.save();

          return response
            .status(201)
            .json({ msg: "Cart Item successfully added" });
        }

        const isProductDuplicate = userCart.cart.find(
          (item) => item.productID === productID
        );
        const cartItem = {
          productID,
          productName,
          productImage,
          productPrice,
          Qty,
        };
        if (!isProductDuplicate) {
          userCart.cart = [cartItem, ...userCart.cart];
          const updatedDoc = await cartModel.findOneAndUpdate(
            { cart_owner: userEmail },
            userCart,
            { new: true }
          );
          return response.status(201).json({ msg: "Item added to cart" });
        }

        const updatedCart = userCart.cart.map((item) =>
          item.productID === productID ? cartItem : item
        );

        userCart.cart = updatedCart;

        const updatedDoc = await cartModel.findOneAndUpdate(
          { cart_owner: userEmail },
          userCart,
          {
            new: true,
          }
        );
        return response.status(204).json({ msg: "Item added to cart" });
      });
    } catch (error) {
      return response.status(500, {
        msg: "Network Error: Failed to add item to cart try again later",
      });
    }
  }

  DeleteCartItem(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg:
              "Network Error: Failed to remove item from cart try again later",
          });
        }

        const { productID } = fields;

        if (!productID) {
          return response.status(400).json({ msg: "Product ID required" });
        }

        const userSession = request.session.user;
        const userEmail = userSession.userMail;

        const userCart = await cartModel.findOne({ cart_owner: userEmail });

        if (!userCart) {
          return response
            .status(404)
            .json({ msg: "Account does not have cart" });
        }

        userCart.cart = userCart.cart.filter(
          (item) => item.productID !== productID
        );

        const updatedDoc = await Cart.findOneAndUpdate(
          { owner: userEmail },
          existingCartOwner,
          {
            new: true,
          }
        );

        return response.status(200).json({ msg: "Item removed successfully" });
      });
    } catch (error) {
      return response.status(500).json({
        msg: "Network Error: Failed to remove item from cart try again later",
      });
    }
  }

  async GetUserCart(request, response) {
    const userSession = request.session.user;
    const userEmail = userSession.userMail;

    try {
      const cart = await cartModel.findOne({ cart_owner: userEmail });

      if (!cart) {
        return response
          .status(404)
          .json({ msg: "Account does not have cart." });
      }

      return response.status(200).json(cart);
    } catch (error) {
      return response.status(500).json({
        msg: "Network Error: Failed to get user cart try again later",
      });
    }
  }
}

export default CartController;
