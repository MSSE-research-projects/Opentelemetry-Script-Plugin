import { ADD_FEEDBACK, ADD_PRESURVEY, ADD_POSTSURVEY } from "./actionTypes";

export const addFeedback = (email, content) => ({
  type: ADD_FEEDBACK,
  payload: {
    email,
    content,
  },
});

export const addPreSurvey = answers => ({
  type: ADD_PRESURVEY,
  payload: {
    answers,
  },
});

export const addPostSurvey = answers => ({
  type: ADD_POSTSURVEY,
  payload: {
    answers,
  },
});
