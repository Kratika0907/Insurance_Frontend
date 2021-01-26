import React from "react";
import { useHistory } from "react-router-dom";
import "./card.css";

const PolicyCard = ({ policyDetail }) => {
  const { policyId, customerId, date, premium } = policyDetail;
  const history = useHistory();
  const policyDetailClick = (policyDetail) => {
    history.state = policyDetail;
    history.push(`/${policyId}`);
  };
  return (
    <div
      className="polcard-container"
      onClick={() => policyDetailClick(policyDetail)}
    >
      <div className="style-block">
        <p>Vehicle</p>
      </div>
      <div className="polcard-details">
        <p> Policy Number : {policyId}</p>
        <p> Customer Id : {customerId}</p>
        <p> Date of Purchase : {date}</p>
        <p>Premium Amount {premium} </p>
      </div>
    </div>
  );
};

const PoliciesDisplay = (props) => {
  const { policyData } = props;
  const displayResult = policyData.map((policy) => {
    return <PolicyCard policyDetail={policy} key={policy.id} />;
  });
  return <div data-testid="policy-card-container" className="policies-container"> {displayResult} </div>;
};

export default PoliciesDisplay;
