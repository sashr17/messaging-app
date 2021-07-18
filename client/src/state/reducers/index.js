// import the reducers
import ProcessReducer from "./ProcessReducer";
import { combineReducers } from "redux";
// define the object and call the action
const rootReducers = combineReducers({
  ProcessReducer: ProcessReducer,
});
// else return default root reducer
export default rootReducers;
