import React from "react";
import "./styleNot.css";

const NotFound = () => {
  return (
    <div className="container404">
      <h1>Oops!</h1>

      <h2>404 - PAGE NOT FOUND</h2>

      <p>
        The page you are looking for might have been removed <br /> had its name
        changed or temporarily not available.
      </p>

      <a className="button404" href="http://localhost:3000">
        GO TO HOMEPAGE
      </a>
    </div>
  );
};

export default NotFound;
