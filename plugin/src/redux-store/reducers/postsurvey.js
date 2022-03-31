import { ADD_POSTSURVEY } from "../actionTypes";

const initialState = {
  answers: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_POSTSURVEY: {
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
