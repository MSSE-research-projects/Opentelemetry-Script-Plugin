import axios from 'axios';
import ExperimentManager from './ExperimentManager';
import Step from './Step';
import UI from './UI';
import store from './redux-store/store'

class FinishedStep extends Step {
  constructor() {
    super();
  }

  displayFinishedWindow() {
    const finishedBlock = UI.createFinisedBlock();

    UI.createLightbox();

    document.body.appendChild(finishedBlock);
  }

  exportSurveyAnswers() {
    const ENDPOINT_PRESURVEY_ANSWERS = "/api/presurvey-answers";
    const ENDPOINT_POSTSURVEY_ANSWERS = "/api/postsurvey-answers";
    const ENDPOINT_FEEDBACK = "/api/feedback";

    const state = store.getState();

    axios
      .post(`http://${ExperimentManager.serverUrl}${ENDPOINT_PRESURVEY_ANSWERS}`, state.presurvey)
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(`http://${ExperimentManager.serverUrl}${ENDPOINT_POSTSURVEY_ANSWERS}`, state.postsurvey)
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(`http://${ExperimentManager.serverUrl}${ENDPOINT_FEEDBACK}`, state.feedback)
      .catch((error) => {
        console.log(error);
      });
  }

  start() {
    this.displayFinishedWindow();
    this.exportSurveyAnswers();
    window.sessionStorage.removeItem("ux-test-olap-session");
  }
}

export default FinishedStep;
