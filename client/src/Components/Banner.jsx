import React from "react";
import BannerImg from "../images/cover.jpeg";
import "../StyleSheet/Banner.css";
const Banner = () => {
  return (
    <div className="Banner">
      <img src={BannerImg} alt="Page Banner" className="Banner__img" />
    </div>
  );
};

export default Banner;
