import React, { useContext } from "react";
import BackendService from "../../util/backend_service";
import { PolicyStateContext } from "../../App";
import "./search.css";
export const SearchPolicy = (props) => {
  const context = useContext(PolicyStateContext);
  const {
    query: userQuerySelection,
    dispatch,
    originalData,
    userQuery,
  } = props;
  const handleSearchChange = (e) => {
    dispatch({ type: "SET_QUERY_SELECTION", payload: e.target.value });
  };
  const handleInputChange = (e) => {
    dispatch({ type: "SET_QUERY", payload: Number(e.target.value) });
  };
  const handlePolicySearch = (e) => {
    let dataArr = originalData;
    if (userQuerySelection === "policyId") {
      dataArr = originalData.filter(
        (policy) => policy.policyId === Number(userQuery)
      );
      dispatch({ type: "SET_POLICIES", payload: dataArr });
    } else if (userQuerySelection === "customerId") {
      context.dispatch({ type: "SHOW_LOADER", payload: true });
      BackendService.getPolicyByCustomerId(Number(userQuery)).then(
        (customerPolicyData) => {
          dataArr = originalData.filter((policy) =>
            customerPolicyData.includes(policy.policyId)
          );
          context.dispatch({ type: "SHOW_LOADER", payload: false });
          dispatch({ type: "SET_POLICIES", payload: dataArr });
        }
      );
    } else {
      dispatch({ type: "SET_POLICIES", payload: dataArr });
    }
  };
  return (
    <div className="search-container">
      <label htmlFor="policy-search">Choose your search criteria:</label>
      <select name="search-x" id="policy-search" onChange={handleSearchChange}>
        <option value="">--Please choose an option--</option>
        <option value="customerId">Customer Id</option>
        <option value="policyId">Policy Id</option>
      </select>
      <input
        type="text"
        placeholder={`please enter ${userQuerySelection}`}
        onChange={handleInputChange}
        data-testid="user-search-input"
      />
      <button className="search-button" data-testid="user-search-button" onClick={handlePolicySearch}>
        {" "}
        Search
      </button>
    </div>
  );
};
