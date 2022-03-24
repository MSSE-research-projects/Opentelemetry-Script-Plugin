class Step {
  nextStep;
  block;
  clickButton;
  nextFunc;

  constructor() {
    this.clickButton = document.createElement("button");
    this.clickButton.textContent = "Done";
  }

  setNextStep(nextStep) {
    this.nextStep = nextStep;
  }

  setNextFunction(func) {
    this.nextFunc = func;
  }

  bindClickButton(callback) {
    this.clickButton.onclick = () => {
      callback();
    }
  }
  
  start() {
    this.bindClickButton(this.end.bind(this));
    this.display();
  }

  destroy() {
    if (this.block) {
      this.block.remove();
    }
    Step.removeLightbox();
  }

  buildBlock() {
    
  }

  display() {
    this.buildBlock();
    Step.createLightbox();
    if (this.block) {
      document.body.appendChild(this.block);
    }
  }

  end() {
    this.destroy();
    if (this.nextFunc) {
      this.nextFunc();
    }
    if (this.nextStep) {
      this.nextStep.start();
    }
  }

  static removeLightbox() {
    const lb = document.getElementById('lightbox_background');
    if (lb) {
      lb.parentNode.removeChild(lb);
    }
  }

  static createLightbox() {
    const background = document.createElement('div');
    background.id = "lightbox_background";
    const lightbox = document.createElement('div');
    lightbox.id = "lightbox";
    
    document.body.appendChild(background);
    background.appendChild(lightbox);
    return background;
  }
}

export default Step;
