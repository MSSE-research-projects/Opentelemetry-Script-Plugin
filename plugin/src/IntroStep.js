import IntroBlock from './components/IntroBlock';
import Step from './Step';

class IntroStep extends Step {
  intro;

  constructor(intro) {
    super();
    this.intro = intro;
  }

  render() {
    this.renderComponent(IntroBlock, { data: this.intro, callback: this.triggerNextStep.bind(this) }, this.rootElement);
  }
}

export default IntroStep;
