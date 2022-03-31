class UI {
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

  static createRootElement() {
    const ROOT_STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;

    const rootElement = document.createElement("div");
    rootElement.setAttribute('style', ROOT_STYLE);

    return rootElement;
  }

  static createFinisedBlock() {
    const STYLE = `
    z-index: 9999999;
    position: fixed;
    background: white;
    top: 40%;
    width: 100%;`;
    const title = document.createElement("div");
    title.textContent = "Finishing Up";
    const desc = document.createElement("div");
    desc.textContent = "Thank you for participating!";

    const block = document.createElement("div");
    block.appendChild(title);
    block.appendChild(desc);
    block.setAttribute('style', STYLE);

    return block;
  }
}

export default UI;
