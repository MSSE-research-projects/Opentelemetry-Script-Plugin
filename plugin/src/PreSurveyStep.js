import Step from './Step';
import SurveyBlock  from './components/survey/SurveyBlock';

class PreSurveyStep extends Step {
  preSurvey;

  constructor(preSurvey) {
    super();
    this.preSurvey = preSurvey;
  }

  render() {
    const props = {
      title: this.preSurvey.title,
      questions: this.preSurvey.questions,
      callback: this.triggerNextStep.bind(this),
      type: "pre-survey",
    };

    this.renderComponent(SurveyBlock, props, this.rootElement);
  }
}

export default PreSurveyStep;
