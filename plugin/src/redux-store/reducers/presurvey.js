import { ADD_PRESURVEY } from "../actionTypes";

const initialState = {
  answers: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRESURVEY: {
      const { answers } = action.payload;
      return {
        ...state,
        answers,
      };
    }
    default:
      return state;
  }
}
