import { ADD_PRESURVEY } from "../actionTypes";

const initialState = {
  answers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_PRESURVEY: {
      const { sessionId, answers } = action.payload;
      return {
        ...state,
        sessionId,
        answers,
      };
    }
    default:
      return state;
  }
}
