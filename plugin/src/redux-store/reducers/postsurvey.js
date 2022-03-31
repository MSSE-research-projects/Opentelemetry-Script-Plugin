import { ADD_POSTSURVEY } from "../actionTypes";

const initialState = {
  answers: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POSTSURVEY: {
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
