import React from "react";
import { Link, withRouter } from "react-router-dom";

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
          <Link class="navbar-brand" to="/">
            Job World
          </Link>
         
          <div>
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/">
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/search" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/search">
                  Search
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/alljobs" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/alljobs">
                  All Jobs
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/account" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/account">
                  Account
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/login" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/logout" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/logout">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default withRouter(Navigation);