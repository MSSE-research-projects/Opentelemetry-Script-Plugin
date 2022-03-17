import { ConsoleSpanExporter, SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

import Step from './Step';
import PostSurveyStep from './PostSurveyStep';
import TaskStep from './TaskStep';
import PreSurveyStep from './PreSurveyStep';
import IntroStep from './IntroStep';
import FeedBackStep from './FeedBackStep';

class ExperimentManager {
  steps = [];

  displayFinished() {
    const TMP_STYLE = `
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
    block.setAttribute('style', TMP_STYLE);

    Step.createLightbox();

    document.body.appendChild(block);
  }

  constructor(settings) {
    const postSurveyStep = new PostSurveyStep(settings.postSurvey);
    const taskStep = new TaskStep(settings.tasks);
    const preSurveyStep = new PreSurveyStep(settings.preSurvey);
    const introStep = new IntroStep(settings.intro);
    const feedBackStep = new FeedBackStep();

    this.steps = [introStep, preSurveyStep, taskStep, postSurveyStep, feedBackStep];

    for (let i = 0; i < this.steps.length; i += 1) {
      if (i < this.steps.length - 1) {
        this.steps[i].setNextStep(this.steps[i + 1]);
      } else {
        this.steps[i].setNextFunction(this.displayFinished);
      }
    }
  }

  launch() {
    this.steps[0].start();
    const provider = new WebTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

    provider.register({
      // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
      contextManager: new ZoneContextManager(),
    });

    // Registering instrumentations
    registerInstrumentations({
      instrumentations: [
        new UserInteractionInstrumentation({
          eventNames: ['click'],
        }),
      ],
    });
  }
}

export default ExperimentManager;
