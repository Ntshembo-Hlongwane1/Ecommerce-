import Formidable from "formidable";
import wishModel from "../../Models/Wishlist/Wishlist";

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
        .json({ msg: "Network Error: Failed to item to wish list" });
    }
  }
}

export default WishListController;
