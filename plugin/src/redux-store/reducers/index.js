import { combineReducers } from "redux";
import feedback from "./feedback";
import presurvey from "./presurvey";
import postsurvey from "./postsurvey";

export default combineReducers({
  feedback,
  presurvey,
  postsurvey,
});
