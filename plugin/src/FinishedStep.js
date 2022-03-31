import axios from 'axios';
import ExperimentManager from './ExperimentManager';
import Step from './Step';
import UI from './UI';
import store from './redux-store/store'

class FinishedStep extends Step {
  constructor() {
    super();
  }

  displayFinished() {
    const finishedBlock = UI.createFinisedBlock();

    UI.createLightbox();

    document.body.appendChild(finishedBlock);
  }

  collectSurveyAnswers() {
    const state = store.getState();
    axios
      .post(`http://${ExperimentManager.serverUrl}/api/presurvey-answers`, state.presurvey)
      .catch((error) => {
        console.log(error);
      });
    axios
      .post(`http://${ExperimentManager.serverUrl}/api/postsurvey-answers`, state.postsurvey)
      .catch((error) => {
        console.log(error);
      });
  }

  start() {
    this.displayFinished();
    this.collectSurveyAnswers();
  } 
}

export default FinishedStep;
