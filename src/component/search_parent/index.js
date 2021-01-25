import React from 'react';
import {SearchPolicy} from '../search/search'
const initialSearchState = {
    userQuery :'',
    userQuerySelection : 'Please select option'
}

function searchReducer (state, action) {
    switch (action.type) {
        case 'SET_QUERY':
          return {
              ...state,
              userQuery : action.payload
          };
        case 'SET_QUERY_SELECTION':
          return {
              ...state,
              userQuerySelection : action.payload
          }
        default: return state
      }
}
const Search = () => {
    const [state, dispatch] = React.useReducer(searchReducer, initialSearchState);
    return (
        <div className="search-parent">
            <SearchPolicy query={state.userQuerySelection} dispatch={dispatch}/>
        </div>

    )
}

export default Search