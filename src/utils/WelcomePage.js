import React from "react";
import chatlogo from "../assets/Images/chat.png";

const Welcome = () => {
  return (
    <div>
      <div
        className="convo-wel d-flex justify-content-center align-items-center"
        style={{
          height: "100vh",
          background: "rgb(255 255 255)",
          color: "black",
         
        }}
      >
        <div className="card p-5 rounded">
          <h6 className="fs-3">👋 Hey, fam! So pumped you're here at Chat!</h6>
          <p
            className="text-center fw-medium mt-3"
            style={{ color: "rgb(140 140 140)" }}
          >
            Ready for some epic convos and vibes? <br /> Here's the lowdown to
            get you kickin'
          </p>
        </div>
        <img src={chatlogo} alt="" style={{ width: "100px" }} />
      </div>
    </div>
  );
};

export default Welcome;
