import { ADD_FEEDBACK, ADD_PRESURVEY, ADD_POSTSURVEY } from "./actionTypes";

export const addFeedback = (email, content) => ({
  type: ADD_FEEDBACK,
  payload: {
    email,
    content,
  },
});

export const addPreSurvey = (sessionId, answers) => ({
  type: ADD_PRESURVEY,
  payload: {
    sessionId,
    answers,
  },
});

export const addPostSurvey = (sessionId, answers) => ({
  type: ADD_POSTSURVEY,
  payload: {
    sessionId,
    answers,
  },
});
