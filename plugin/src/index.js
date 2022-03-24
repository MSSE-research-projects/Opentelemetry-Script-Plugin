import ExperimentManager from './ExperimentManager';
import axios from 'axios';

const cssId = 'lightbox-css-id';  // you could encode the css path itself to generate id..
if (!document.getElementById(cssId)) {
    const head  = document.getElementsByTagName('head')[0];
    const link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = `http://${ExperimentManager.serverUrl}/static/lightbox.css`;
    link.media = 'all';
    head.appendChild(link);
}

axios
  .get(`http://${ExperimentManager.serverUrl}/api/surveys/test`)
  .then(({ data: surveys }) => {
    console.log(surveys);
    new ExperimentManager(surveys).launch();
  })
  .catch((error) => {
    console.log(error);
  });
