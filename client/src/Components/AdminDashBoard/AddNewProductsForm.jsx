import React, { useState } from "react";
import { Input } from "@material-ui/core";
import "../../StyleSheet/Form.css";
import axios from "axios";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
const AddNewProductsForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [stock_count, setStockCount] = useState(0);
  const [picture, setPicture] = useState(null);
  const [category, setCategory] = useState("");

  const responseNotification = (statusCode, response) => {
    switch (statusCode) {
      case 201:
        store.addNotification({
          container: "top-right",
          insert: "top",
          message: response,
          title: "Addintion Of New Product Succes",
          type: "success",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true,
          },
          onRemoval: () => {
            window.location.reload(false);
          },
        });

        break;
      case 400:
        store.addNotification({
          container: "top-right",
          insert: "top",
          message: response,
          title: "Addition Of New Product Failed",
          type: "danger",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            showIcon: true,
          },
        });
        break;
      case 500:
        store.addNotification({
          container: "top-right",
          insert: "top",
          message: response,
          title: "Addition Of New Product Failed",
          type: "warning",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 10000,
            showIcon: true,
          },
        });
        break;
      default:
        break;
    }
  };

  const AddNewProduct = async (e) => {
    e.preventDefault();
    const form_data = new FormData();
    form_data.append("name", name);
    form_data.append("description", description);
    form_data.append("price", price);
    form_data.append("category", category);
    form_data.append("stock_count", stock_count);
    form_data.append("picture", picture);

    const url = "http://localhost:5000/api/add-new-product";

    try {
      const response = await axios.post(url, form_data, {
        withCredentials: true,
      });

      const { status, data } = response;
      responseNotification(status, data.msg);
    } catch (error) {
      const { status, data } = error.response;
      responseNotification(status, data.msg);
    }
  };

  return (
    <div className="NewProductsForm">
      <h2 className="Form__header">Add New Product</h2>
      <label>Product Name</label>
      <Input
        type="text"
        placeholder="Product Name"
        className="Form__fields"
        onChange={(e) => setName(e.target.value)}
      />
      <label>Product Description</label>
      <Input
        type="text"
        placeholder="Product Description"
        className="Form__fields"
        onChange={(e) => setDescription(e.target.value)}
      />
      <label>Product Price</label>
      <Input
        type="number"
        placeholder="Product Price"
        className="Form__fields"
        onChange={(e) => setPrice(e.target.value)}
      />
      <label>Product Category</label>
      <select
        className="Form__fields"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>...</option>
        <option value="Hoodies">Hoodies</option>
        <option value="Sneakers">Sneakers</option>
        <option value="Jeans">Jeans</option>
      </select>
      <label htmlFor="file-input">Product Picture</label>
      <Input
        type="file"
        placeholder="Product Picture"
        className="Form__fields"
        onChange={(e) => setPicture(e.target.files[0])}
      />
      <label>Stock Count</label>
      <Input
        type="number"
        placeholder="Product Count"
        className="Form__fields"
        onChange={(e) => setStockCount(e.target.value)}
      />
      <button className="form-btn" onClick={AddNewProduct}>
        Add Product
      </button>
      <ReactNotifications className="Notification-Card form-notification" />
    </div>
  );
};

export default AddNewProductsForm;
