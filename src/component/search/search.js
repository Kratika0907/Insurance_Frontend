import BackendService from '../../util/backend_service'
import './search.css'
export const SearchPolicy = (props) => {
  const { query: userQuerySelection, dispatch, originalData, userQuery} = props;
  const handleSearchChange = (e) => {
    dispatch({ type: "SET_QUERY_SELECTION", payload: e.target.value });
  };
  const handleInputChange = (e) => {
    dispatch({ type: "SET_QUERY", payload: Number(e.target.value) });
  };
 const handlePolicySearch = (e) => {
    let dataArr = originalData;
    if (userQuerySelection === 'policyId') {
      dataArr = originalData.filter((policy) => policy.policyId === Number(userQuery))
      dispatch({type: "SET_POLICIES" , payload: dataArr})
    }
    else if (userQuerySelection === 'customerId'){
     BackendService.getPolicyByCustomerId(Number(userQuery)).then((data) => {
      dispatch({type: "SET_POLICIES" , payload: data})
     });
    }
    else {
      dispatch({type: "SET_POLICIES" , payload: dataArr})
    }

  }
  return (
    <div className="search-container">
      <label for="policy-search">Choose your search criteria:</label>
      <select name="search-x" id="policy-search" onChange={handleSearchChange}>
        <option value="">--Please choose an option--</option>
        <option value="customerId">Customer Id</option>
        <option value="policyId">Policy Id</option>
      </select>
      <input
        type="text"
        placeholder={`please enter ${userQuerySelection}`}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handlePolicySearch}> Search</button>
    </div>
  );
};
