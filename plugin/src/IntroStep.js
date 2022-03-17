import Step from './Step';

const TMP_STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;

class IntroStep extends Step {
  intro;

  constructor(intro) {
    super();
    this.intro = intro;
    this.clickButton.textContent = "Begin";
  }

  buildBlock() {
    const block = document.createElement("div");
    const description = document.createElement("div");
    description.textContent = this.intro.description;
    const title = document.createElement("div")
    title.textContent = this.intro.title;

    block.appendChild(title);
    block.appendChild(description);
    block.appendChild(this.clickButton);

    block.setAttribute('style', TMP_STYLE);

    this.block = block;
  }
}

export default IntroStep;
