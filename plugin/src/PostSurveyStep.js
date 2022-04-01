import Step from './Step';
import SurveyBlock  from './components/survey/SurveyBlock';

class PostSurveyStep extends Step {
  postSurvey;

  constructor(postSurvey) {
    super();
    this.postSurvey = postSurvey;
  }

  render() {
    const props = {
      title: this.postSurvey.title,
      questions: this.postSurvey.questions,
      callback: this.triggerNextStep.bind(this),
      type: "post-survey",
    };

    this.renderComponent(SurveyBlock, props, this.rootElement);
  }
}

export default PostSurveyStep;
