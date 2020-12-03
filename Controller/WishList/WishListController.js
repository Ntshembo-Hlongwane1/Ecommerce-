import Formidable from "formidable";
import wishModel from "../../Models/Wishlist/Wishlist";
import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from "dotenv";
dotenv.config();
const db = mongoose.connection;

const pusher = new Pusher({
  appId: process.env.pusher_appID,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  useTLS: process.env.pusher_TlsConnection,
});

db.once("open", () => {
  const wishListCollection = db.collection("wishlists");
  const changeStream = wishListCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      pusher.trigger("wishlistInsertion", "insert", {
        insertion: true,
      });
    } else if (change.operationType === "update") {
      pusher.trigger("wishlistUpdate", "update", {
        update: true,
      });
    }
  });
});

class WishListController {
  AddItem(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response
            .status(500)
            .json({ msg: "Network Error: Failed to item to wish list" });
        }

        const { imageURL, productID, productName, productPrice } = fields;

        if (!imageURL || !productID || !productName || !productPrice) {
          return response
            .status(400)
            .json({ msg: "Failed to add item to wish list" });
        }

        const userSession = request.session.user || false;
        const userEmail = userSession.userMail;

        const existingUserWishList = await wishModel.findOne({
          owner: userEmail,
        });

        if (!existingUserWishList) {
          const newWishList = new wishModel({
            owner: userEmail,
            wishlist: {
              productID,
              productName,
              productPrice,
              imageURL,
            },
          });

          const savedWishList = await newWishList.save();
          return response.status(201).json({ msg: "Item added to wishlist" });
        }

        const isItemDuplicate = existingUserWishList.wishlist.find(
          (item) => item.productID === productID
        );

        if (isItemDuplicate) {
          return response.status(200).json({ msg: "Item already in wishlist" });
        }

        const newItem = {
          productID,
          productName,
          productPrice,
          imageURL,
        };

        existingUserWishList.wishlist = [
          newItem,
          ...existingUserWishList.wishlist,
        ];

        const updatedDoc = await wishModel.findOneAndUpdate(
          { owner: userEmail },
          existingUserWishList,
          { new: true }
        );
        return response.status(201).json({ msg: "Item added to wishlist" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Network Error: Failed to add item to wish list" });
    }
  }

  RemoveItem(request, response) {
    const form = new Formidable.IncomingForm();

    try {
      form.parse(request, async (error, fields, files) => {
        if (error) {
          return response.status(500).json({
            msg: "Network Error: Failed to remove item from wishlist",
          });
        }

        const { productID } = fields;
        const userSession = request.session.user || false;
        const userEmail = userSession.userMail;

        const userWishList = await wishModel.findOne({ owner: userEmail });

        if (!userWishList) {
          return response.status(400).json({ msg: "Wishlist not existent" });
        }

        userWishList.wishlist = userWishList.wishlist.filter(
          (item) => item.productID !== productID
        );

        const updateDoc = await wishModel.findOneAndUpdate(
          { owner: userEmail },
          userWishList,
          { new: true }
        );

        return response.status(200).json({ msg: "Item successfully removed" });
      });
    } catch (error) {
      return response
        .status(500)
        .json({ msg: "Network Error: Failed to remove item from wish list" });
    }
  }

  async GetWishList(request, response) {
    try {
      const userSession = request.session.user || false;
      const userEmail = userSession.userMail;

      const wishlist = await wishModel.findOne({ owner: userEmail });

      if (!wishlist) {
        return response.status(404).json({ msg: "Wish List Empty" });
      }

      return response.status(200).json(wishlist);
    } catch (error) {
      return response.status(500, {
        msg: "Network Error: Failed to get your wishlist try again later",
      });
    }
  }
}

export default WishListController;
