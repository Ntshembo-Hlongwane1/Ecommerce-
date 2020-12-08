import React, { useState, useEffect } from "react";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import LanguageIcon from "@material-ui/icons/Language";
import SearchIcon from "@material-ui/icons/Search";
import PersonIcon from "@material-ui/icons/Person";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import "../../StyleSheet/DesktopHeader.css";
import { useSelector } from "react-redux";
import { Sidebar } from "react-sidebar-ui";
import "react-sidebar-ui/dist/index.css";
import HomeIcon from "@material-ui/icons/Home";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ClearIcon from "@material-ui/icons/Clear";
import axios from "axios";
import ReactNotifications from "react-notifications-component";
import { store } from "react-notifications-component";
import "animate.css";
import "react-notifications-component/dist/theme.css";
import { Link, useHistory } from "react-router-dom";
import StorefrontIcon from "@material-ui/icons/Storefront";
import TurnedInIcon from "@material-ui/icons/TurnedIn";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import MenuIcon from "@material-ui/icons/Menu";

const DesktopHeader = () => {
  const [isScrolling, setScrolling] = useState(false);
  const { authStatus } = useSelector((state) => state.userAuthStatus);

  const [isOpen, setIsOpen] = useState(false);
  const [isDashMenuOpenend, setIsDashMenuOpened] = useState(false);
  const [displayCategories, setDisplayCategories] = useState(false);
  const history = useHistory();
  const top = 0;
  const notifyState = localStorage.getItem("notify") || false;
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

  const OpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const responseNotification = (statusCode, response) => {
    switch (statusCode) {
      case 200:
        store.addNotification({
          container: "top-right",
          insert: "top",
          message: response,
          title: "Login Success",
          type: "success",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 3000,
            showIcon: true,
          },
          onRemoval: () => {
            history.push("/");
            window.location.reload(false);
          },
        });

        break;

      case 500:
        store.addNotification({
          container: "top-right",
          insert: "top",
          message: response,
          title: "Login Failed",
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

  const DisplayCategories = () => {
    setDisplayCategories(!displayCategories);
  };

  const LogOut = async () => {
    const url = "http://localhost:5000/api/user-logout";
    const production__url =
      "https://hlongwane-botique.herokuapp.com/api/user-logout";
    setIsOpen(!isOpen);

    try {
      const response = await axios.get(production__url, {
        withCredentials: true,
      });
      const { data, status } = response;
      responseNotification(status, data.msg);
    } catch (error) {
      const { data, status } = error.response;
      responseNotification(status, data.msg);
    }
  };

  const removeNotification = () => {
    localStorage.removeItem("notify");
    window.location.reload(false);
    history.push("/wishlist");
  };

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
            <Link to="/" className="Router__link">
              <h3 className="leftBottom__brandName">Hlongwane Botique</h3>
            </Link>
          </div>
          <div className="left__clothCategories">
            <Link to="/products-hoodies" className="Router__link">
              <h4 className="leftBottom__category category-hoodie">Hoodies</h4>
            </Link>
            <Link to="/products-jeans" className="Router__link">
              <h4 className="leftBottom__category category-jean">Jeans</h4>
            </Link>
            <Link to="/products-sneakers" className="Router__link">
              <h4 className="leftBottom__category category-sneaker">
                Sneakers
              </h4>
            </Link>
          </div>
        </div>
        <div className="bottom__right">
          <div className="right__searchIcon">
            <SearchIcon className="right__icons search-icon" />
          </div>
          <div className="right__personIcons">
            <PersonIcon
              className="right__icons person-icon"
              onClick={OpenMenu}
            />
            {isOpen ? (
              <Sidebar bgColor="black">
                <ClearIcon className="ClosingButton" onClick={OpenMenu} />

                <div className="Home__menuItem" onClick={OpenMenu}>
                  <HomeIcon />
                  <h4 className="Menu__text">Home</h4>
                </div>
                <Link to="/cart" className="Router__link sideBar-menuText">
                  <div className="menuCart" onClick={OpenMenu}>
                    <ShoppingCartIcon />
                    <h4 className="Menu__text">My Cart</h4>
                  </div>
                </Link>
                <Link to="/wishlist" className="Router__link sideBar-menuText">
                  <div className="wishlist " onClick={OpenMenu}>
                    <FavoriteBorderIcon />
                    <h4 className="Menu__text">My WishList</h4>
                  </div>
                </Link>
                <div className="clothingCategories" onClick={DisplayCategories}>
                  <StorefrontIcon />
                  <h4 className="Menu__text"> Categories</h4>
                </div>
                <div className="clothesCategories">
                  {displayCategories ? (
                    <div className="categories">
                      <Link
                        to="/products-hoodies"
                        className="Router__link sideBar-menuText"
                        onClick={OpenMenu}
                      >
                        <div className="Hoodies">
                          <TurnedInIcon />
                          <h4 className="Menu__text">Hoodies</h4>
                        </div>
                      </Link>
                      <Link
                        to="/products-sneakers"
                        className="Router__link sideBar-menuText"
                        onClick={OpenMenu}
                      >
                        <div className="Sneakers">
                          <TurnedInIcon />
                          <h4 className="Menu__text">Sneakers</h4>
                        </div>
                      </Link>
                      <Link
                        to="/products-jeans"
                        className="Router__link sideBar-menuText"
                        onClick={OpenMenu}
                      >
                        <div className="Jeans">
                          <TurnedInIcon />
                          <h4 className="Menu__text">Jeans</h4>
                        </div>
                      </Link>
                    </div>
                  ) : null}
                </div>
                {authStatus && authStatus.auth_status ? (
                  <div className="Auth__statusItem" onClick={LogOut}>
                    <ExitToAppIcon />
                    <h4 className="Menu__text">LogOut</h4>
                  </div>
                ) : (
                  <Link
                    to="/user-signin"
                    className="Router__link sideBar-menuText"
                  >
                    <div className="Auth__statusItem" onClick={OpenMenu}>
                      <LockOpenIcon />
                      <h4 className="Menu__text">SignIn / SignUp</h4>
                    </div>
                  </Link>
                )}
                {authStatus && authStatus.role_status ? (
                  <div
                    className="UserRole__status"
                    onClick={() => setIsDashMenuOpened(!isDashMenuOpenend)}
                  >
                    <DashboardIcon />
                    <h4 className="Menu__text">Dashboard</h4>
                  </div>
                ) : null}
                {isDashMenuOpenend ? (
                  <div className="DashBoardMenu">
                    <Link
                      to="/admin-dashboard"
                      className="Router__link sideBar-menuText"
                    >
                      <div className="DashBoardMenu__home">
                        <HomeIcon />
                        <h4 className="DashBoardMenu__text">Dashboard Home</h4>
                      </div>
                    </Link>
                    <div className="DashBoardMenu__orders">
                      <TurnedInIcon />
                      <h4 className="DashBoardMenu__text">Orders</h4>
                    </div>
                    <div className="DashBoardMenu__inventory">
                      <StorefrontIcon />
                      <h4 className="DashBoardMenu__text">Inventory</h4>
                    </div>
                  </div>
                ) : null}

                <input
                  type="text"
                  placeholder="Search"
                  className="SearchField"
                />
              </Sidebar>
            ) : null}
          </div>
          <div className="right__favouriteIcon">
            <FavoriteBorderIcon
              className="right__icons favourite-icon"
              onClick={removeNotification}
            />
            {notifyState ? (
              <FiberManualRecordIcon className="notification-icon" />
            ) : null}
          </div>
          <Link to="/cart" className="Router__link">
            <div className="right__cartIcon">
              <ShoppingCartIcon className="right__icons cart-icon" />
            </div>
          </Link>
          <MenuIcon className="menuBar" onClick={OpenMenu} />
        </div>
      </div>
      <ReactNotifications className="Notification-Card" />
    </div>
  );
};

export default DesktopHeader;
