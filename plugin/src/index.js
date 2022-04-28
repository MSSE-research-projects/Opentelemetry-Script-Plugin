import ExperimentManager from './ExperimentManager';
import axios from 'axios';

const cssId = 'lightbox-css-id';  // you could encode the css path itself to generate id..

export const start = ({ serverUrl, appId, surveyName }) => {

    if (!document.getElementById(cssId)) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');
        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `http://${serverUrl}/static/plugin/lightbox.css`;
        link.media = 'all';
        head.appendChild(link);
    }

    axios
        .get(`http://${serverUrl}/api/surveys/${surveyName}`)
        .then(({data: surveys}) => {
            console.log(surveys);
            new ExperimentManager(surveys, { serverUrl, appId }).launch();
        })
        .catch((error) => {
            console.log(error);
        });
}

