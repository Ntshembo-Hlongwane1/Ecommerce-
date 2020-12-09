import React from "react";
import "../StyleSheet/PageNotFound.css";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <body>
      <div id="notfound">
        <div class="notfound">
          <div class="notfound-404">
            <h1>Oops!</h1>
          </div>
          <h2>404 - Page not found</h2>
          <p>
            The page you are looking for might have been removed had its name
            changed or is temporarily unavailable.
          </p>
          <Link to="/">Go To Homepage</Link>
        </div>
      </div>
      <h5> This templates was made by Colorlib (https://colorlib.com)</h5>
    </body>
  );
};

export default PageNotFound;
