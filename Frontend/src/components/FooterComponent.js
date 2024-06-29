import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

function FooterComponent() {
  return (
    <>
    <footer className="footer d-flex bg-dark text-white py-2 container-fluid" style={{ height: "70px" , position : "fixed" , bottom : 0}}>
      <div className="container d-flex justify-content-center align-content-center flex-column">
        <div className="column d-flex justify-content-center align-content-center ">
          <i className="bi bi-camera-reels-fill"></i>
          <span>MovieFlix</span>
        </div>
        <div className="column container d-flex justify-content-evenly align-content-center ">
          <div >about us</div>
          <div>send feedback</div>
          <div>Help</div>
        </div>
        <div className="column container d-flex justify-content-center align-content-center">
          <div className="px-2">@2023-2024</div>
          <div className="px-2">MovieFlix.com</div>
          <div className="px-2">Inc</div>
        </div>
      </div>
    </footer>
    </>
  );
}

export default FooterComponent;