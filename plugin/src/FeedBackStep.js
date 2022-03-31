import Step from './Step';
import FeedbackBlock from './components/FeedbackBlock';

class FeedBackStep extends Step {
  constructor() {
    super();
  }

  render() {
    this.renderComponent(FeedbackBlock, { callback: this.triggerNextStep.bind(this) }, this.rootElement)
  } 
}

export default FeedBackStep;
