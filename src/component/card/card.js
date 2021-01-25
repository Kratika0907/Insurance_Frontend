import React from "react";
import "./card.css";

export const PolicyCard = (props) => {
  return (
    <div
      className="polcard-container"
      onClick={() => console.log("I am clicked")}
    >
      <div className="style-block"><p>Vehicle</p></div>
      <div className="polcard-details">
        <p> Policy Number</p>
        <p> Customer Id</p>
        <p> Date of Purchase</p>
        <p>Premium Amount</p>
      </div>
    </div>
  );
};
