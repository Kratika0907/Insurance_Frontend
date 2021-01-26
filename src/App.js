import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Loader } from "./component/shared/loader/loader";
import BackendService from "./util/backend_service";
import PolicyPage from "./component/search_parent";
import PolicyDetailPage from "./component/detail/detail";
import PolicyChart from "./component/chart/chart";
import { Header } from "./component/header/header";
import './App.css'

export const PolicyStateContext = React.createContext();
const initialState = {
  policiesData: [],
  policyCount: 1200,
  isLoading: false,
};
function policyReducer(state, action) {
  switch (action.type) {
    case "GET_ALL_POLICY":
      return {
        ...state,
        policiesData: action.payload,
      };
    case "SHOW_LOADER":
      return {
        ...state,
        isLoading: action.payload,
      };
    default: {
      throw new Error("Something went wrong");
    }
  }
}
function App() {
  const [state, dispatch] = React.useReducer(policyReducer, initialState);
  useEffect(() => {
    async function fetchPolicyData() {
      dispatch({ type: "SHOW_LOADER", payload: true });
      const policyData = await BackendService.getAllPolicy();
      dispatch({ type: "SHOW_LOADER", payload: false });
      dispatch({ type: "GET_ALL_POLICY", payload: policyData });
    }
    fetchPolicyData();
  }, []);
  return (
    <PolicyStateContext.Provider
      value={{
        policyData: state,
        dispatch,
        isLoading: state.isLoading,
      }}
    >
      <Router>
        <div className="App">
          <Header>
            <div className="link-container">
            <NavLink
              exact to="/chart"
              activeStyle={{
                fontWeight: "bold",
                color: "white",
                padding: "5px",
              }}
            >
              <p className="link-description"> Chart</p>
            </NavLink>
            <NavLink
              exact to="/"
              activeStyle={{
                fontWeight: "bold",
                color: "white",
                padding: "5px",
              }}
            >
              <p className="link-description"> Home</p>
            </NavLink>
            </div>

          </Header>
          {state.isLoading ? <Loader /> : null}
          <Switch>
            <Route exact path="/">
              <PolicyPage />
            </Route>
            <Route path="/chart">
              <PolicyChart />
            </Route>
            <Route path="/:policyId">
              <PolicyDetailPage />
            </Route>
          </Switch>
        </div>
      </Router>
    </PolicyStateContext.Provider>
  );
}

export default App;
