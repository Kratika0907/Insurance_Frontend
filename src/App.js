import React, {useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import BackendService from './util/backend_service'
import PolicyPage from "./component/search_parent";
import PolicyDetailPage from './component/detail/detail'

export const PolicyStateContext = React.createContext();
const initialState = {
  policiesData : [],
  policyCount : 8
}
function policyReducer(state, action) {
  console.log('I am here')
  switch (action.type) {
    case 'GET_ALL_POLICY':
    return {
      ...state,
      policiesData : action.payload,
    }
    default: {
      throw new Error('Something went wrong')
    }
  }
}
function App() {
  const [state, dispatch] = React.useReducer(policyReducer, initialState);
  useEffect(() => {
    async function fetchPolicyData() {
      const policyData = await BackendService.getAllPolicy();
      console.log({policyData})
      dispatch({ type: 'GET_ALL_POLICY', payload: policyData})
    }
    fetchPolicyData()
  },[])
  return (
    <PolicyStateContext.Provider value = {{
      policyData : state,
      dispatch
    }}>
    <Router>
    <div className="App">
    <div>
    <Link to="/chart">Chart</Link>
    </div>
    <Switch>
      <Route exact path="/">
      <PolicyPage/>
      </Route>
      <Route path="/chart">
        <div> Chart </div>
      </Route>
      <Route path="/:policyId">
      <PolicyDetailPage/>
      </Route>

    </Switch>
    </div>
    </Router>
    </PolicyStateContext.Provider>
  );
}

export default App;
