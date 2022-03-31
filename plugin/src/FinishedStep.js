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
    console.log(state);
  }

  start() {
    this.displayFinished();
    this.collectSurveyAnswers();
  } 
}

export default FinishedStep;
