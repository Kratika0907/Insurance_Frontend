import React, { useReducer, useContext, useEffect } from "react";
import { PolicyStateContext } from "../../App";
import { SearchPolicy } from "../search/search";
import PolicyDisplay from "../card/card";
const initialSearchState = {
  userQuery: "",
  userQuerySelection: "Please select option",
  policyData: [],
};

function getQueryBasedPolicy(state, payload) {
  const { userQuery, userQuerySelection } = state;
  if (userQuery === "") return { ...state, policyData: payload };
  let newPolicyData;
  if (userQuerySelection === "policyId") {
    newPolicyData = payload;
  } else {
    newPolicyData = payload;
  }
  return {
    ...state,
    policyData: newPolicyData,
  };
}
function searchReducer(state, action) {
  switch (action.type) {
    case "SET_QUERY":
      return {
        ...state,
        userQuery: action.payload,
      };
    case "SET_QUERY_SELECTION":
      return {
        ...state,
        userQuerySelection: action.payload,
      };
    case "SET_POLICIES":
      return getQueryBasedPolicy(state, action.payload);
    default:
      return state;
  }
}
const Search = () => {
  const [state, dispatch] = useReducer(searchReducer, initialSearchState);
  const context = useContext(PolicyStateContext);
  useEffect(() => {
    dispatch({
      type: "SET_POLICIES",
      payload: context.policyData.policiesData,
    });
  }, [context.policyData.policiesData]);
  return (
    <div className="search-parent">
      <SearchPolicy
        query={state.userQuerySelection}
        dispatch={dispatch}
        originalData={context.policyData.policiesData}
        userQuery={state.userQuery}
      />
      <PolicyDisplay policyData={state.policyData} />
    </div>
  );
};

export default Search;
