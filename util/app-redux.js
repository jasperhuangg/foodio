import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const initialState = {
  userID: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "setUserID":
      return { ...state, userID: action.value };
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export { store };

const setUserID = (userID) => {
  return {
    type: "setUserID",
    value: userID,
  };
};

export { setUserID };
