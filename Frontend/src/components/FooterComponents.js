import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
// import { useNavigate } from "react-router-dom";

function FooterComponent() {
  return (
    <footer className="footer">
      <div className="container d-flex center flex-column">
        <div className="row">
          <i className="bi bi-camera-reels-fill"></i> <span className="text-dark">MovieFlix</span>
        </div>
        <div className="row container d-flex ">
          <div>about us</div>
          <div>send feedback</div>
          <div>Help</div>
        </div>
        <div className="row container d-flex">
            <div>@2023-2024, MovieFlix.com Inc</div>
        </div>
      </div>
    </footer>
  );
}

export default FooterComponent