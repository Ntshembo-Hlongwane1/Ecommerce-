import React from "react";
import "../../StyleSheet/DashBoard.css";
const DashBoard = () => {
  return (
    <div className="Dashboard">
      <div className="Dashboard__top">
        <h2>WELCOME BACK</h2>
      </div>
      <div className="Dashboard__bottom">
        <div className="bottom__orders">
          <h3>ALL ORDERS</h3>
        </div>
        <div className="bottom__inventory">
          <h3>Store Products</h3>
        </div>
        <div className="bottom__newProducts">
          <h3>Add New Product</h3>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
