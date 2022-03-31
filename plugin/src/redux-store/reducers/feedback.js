import { ADD_FEEDBACK } from "../actionTypes";

const initialState = {
  sessionId: "",
  email: "",
  content: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FEEDBACK: {
      const { email, content, sessionId, } = action.payload;
      return {
        ...state,
        sessionId,
        email,
        content,
      };
    }
    default:
      return state;
  }
}
