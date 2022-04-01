import IntroBlock from './components/IntroBlock';
import Step from './Step';

class IntroStep extends Step {
  intro;

  constructor(intro) {
    super();
    this.intro = intro;
  }

  render() {
    const props = {
      data: this.intro,
      callback: this.triggerNextStep.bind(this)
    };
    this.renderComponent(IntroBlock, props, this.rootElement);
  }
}

export default IntroStep;
