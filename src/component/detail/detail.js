import { useHistory } from "react-router-dom";
import React, { useContext } from "react";
import BackendService from "../../util/backend_service";
import { PolicyStateContext } from "../../App";
import { InputWithLabel } from "../shared/input";
import "./detail.css";

const editArray = [
  "fuel",
  "vehicleSegment",
  "premium",
  "bodilyInjuryLiability",
  "personalInjuryProtection",
  "propertyDamageLiability",
  "collision",
  "comprehensive",
  "gender",
  "region",
  "martialStatus",
  "income",
];
const PolicyDetailCard = () => {
  const history = useHistory();
  const context = useContext(PolicyStateContext);
  const { state } = history;
  const [formState, setFormState] = React.useState(state);
  const handleFormChange = (e) => {
    let newFormState = {
      ...formState,
      [e.target.name]: e.target.value,
    };
    setFormState(newFormState);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    context.dispatch({ type: "SHOW_LOADER", payload: true });
    BackendService.updatePolicyDetails(formState)
      .then((res) => {
        context.dispatch({ type: "SHOW_LOADER", payload: false });
        alert("Changes made sucessfully");
      })
      .catch(console.error);
  };
  return (
    <div className="policy-detail-container">
      <div className="policy-const">
        <p> Policy Number {state.policyId}</p>
        <p>Customer Id {state.customerId}</p>
        <p>Date of Issue {state.date}</p>
      </div>
      <form className="policy-edit" onSubmit={handleFormSubmit}>
        {" "}
        {editArray.map((inputItem) => {
          if (inputItem === "premium") {
            return (
              <InputWithLabel
                key={inputItem}
                name={inputItem}
                value={formState[inputItem]}
                type="Number"
                min="100"
                max="1000000"
                label={inputItem.toUpperCase()}
                required
                change={handleFormChange}
              />
            );
          }
          return (
            <InputWithLabel
              key={inputItem}
              name={inputItem}
              value={formState[inputItem]}
              type="text"
              label={inputItem.toUpperCase()}
              required
              change={handleFormChange}
            />
          );
        })}
        <input type="submit" value="Submit Changes" />
      </form>
    </div>
  );
};

export default PolicyDetailCard;
