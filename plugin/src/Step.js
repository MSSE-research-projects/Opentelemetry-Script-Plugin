import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import store from './redux-store/store';
import UI from './UI';

class Step {
  nextStep;
  rootElement;
  nodes = [];

  constructor() {
    this.rootElement = UI.createRootElement();
    document.body.appendChild(this.rootElement);
  }

  renderComponent(component, props, targetNode) {
    const reactElement = React.createElement(component, props, null);
    ReactDOM.createRoot(targetNode).render(<Provider store={store}>{reactElement}</Provider>);
    this.nodes.push(targetNode);
    return reactElement;
  }

  setNextStep(nextStep) {
    this.nextStep = nextStep;
  }

  start() {
    this.render();
    UI.createLightbox();
  }

  destroy() {
    this.rootElement.innerHTML = '';
    UI.removeLightbox();
  }

  render() {
    
  }

  triggerNextStep() {
    this.destroy();
    this.nextStep.start();
  }
}

export default Step;
