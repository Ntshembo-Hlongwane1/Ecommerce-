import React, { useState, useEffect } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import LanguageIcon from "@material-ui/icons/Language";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "../../StyleSheet/DesktopHeader.css";

const DesktopHeader = () => {
  const [isScrolling, setScrolling] = useState(false);
  const top = 0;
  useEffect(() => {
    window.addEventListener("scroll", () => {
      let scroll = window.pageYOffset || document.documentElement.scrollTop;

      if (scroll > top) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    });
  });
  return (
    <div className="DesktopHeader">
      {isScrolling ? null : (
        <div className="DesktopHeader__top">
          <div className="top__left">
            <LanguageIcon className="leftTop__icon" />
            <h4 className="leftTop__text">English / South Africa</h4>
          </div>
          <div className="top__right">
            <HelpOutlineIcon className="topRight__icon" />
            <h4 className="topRight__text">Customer Care</h4>
          </div>
        </div>
      )}
      <div className="DesktopHeader__bottom">
        <div className="bottom__left">
          <div className="left__brandName">
            <h3 className="leftBottom__brandName">Hlongwane Botique</h3>
          </div>
          <div className="left__clothCategories">
            <h4 className="leftBottom__category category-hoodie">Hoodies</h4>
            <h4 className="leftBottom__category category-jean">Jeans</h4>
            <h4 className="leftBottom__category category-sneaker">Sneakers</h4>
          </div>
        </div>
        <div className="bottom__right">
          <div className="right__searchIcon">
            <SearchIcon className="right__icons search-icon" />
          </div>
          <div className="right__personIcons">
            <PersonIcon className="right__icons person-icon" />
          </div>
          <div className="right__favouriteIcon">
            <FavoriteBorderIcon className="right__icons favourite-icon" />
          </div>
          <div className="right__cartIcon">
            <ShoppingCartIcon className="right__icons cart-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesktopHeader;
