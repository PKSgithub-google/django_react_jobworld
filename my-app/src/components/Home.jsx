import React from "react";
import logo from "../images/icon.png";

function Home() {
  return (
    <div className="home">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src={logo}
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">
            Dream job is just a click away!</h1>
            <p>
            Search For Jobs, post Jobs, hire Local Talent.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;