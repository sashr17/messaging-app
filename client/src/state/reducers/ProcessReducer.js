import { PROCESS } from "../actionTypes";

//initialiaze the function with two arguments
const Reducer = (state = {}, action) => {
  switch (action.type) {
    //returns updated state
    case PROCESS:
      return { ...action.payload };
    //else the current state is retained
    default:
      return state;
  }
};

export default Reducer;
