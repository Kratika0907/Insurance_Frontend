export const SearchPolicy = (props) => {
  const {userQuerySelection, dispatch} = props
    const handleSearchChange = (e) => {
      dispatch({type:'SET_QUERY_SELECTION', payload:e.target.value})
    }
    const handleInputChange = (e) => {
      dispatch({type:'SET_QUERY',payload:e.dispatch})
    }
  return (
    <div className="search-container">
      <label for="policy-search">Choose your param:</label>
      <select name="search-x" id="policy-search" onChange={handleSearchChange}>
        <option value="">--Please choose an option--</option>
        <option value="customerId">Customer Id</option>
        <option value="policyId">Policy Id</option>
      </select>
      <input type="text" placeholder={`please enter ${userQuerySelection}`} onChange={handleInputChange}/>
      <button onClick={() => console.log('serach ready')}> Search</button>
    </div>
  );
};
