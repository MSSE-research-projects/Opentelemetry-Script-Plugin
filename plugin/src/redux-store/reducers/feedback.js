import { ADD_FEEDBACK } from "../actionTypes";

const initialState = {
  email: "",
  content: "",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_FEEDBACK: {
      const { email, content } = action.payload;
      return {
        ...state,
        email,
        content,
      };
    }
    default:
      return state;
  }
}
