import {BatchSpanProcessor, ConsoleSpanExporter, SimpleSpanProcessor} from '@opentelemetry/sdk-trace-base';
import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { registerInstrumentations } from '@opentelemetry/instrumentation';

import PostSurveyStep from './PostSurveyStep';
import TaskStep from './TaskStep';
import PreSurveyStep from './PreSurveyStep';
import IntroStep from './IntroStep';
import FeedBackStep from './FeedBackStep';
import {AlertInstrumentation} from "./instrumentations/alert";
import {ErrorInstrumentation} from "./instrumentations/error";
import {ServerExporter} from "./exporters/ServerExporter";
import {ZoneContextManager} from "@opentelemetry/context-zone";
import {ScrollInstrumentation} from "./instrumentations/scroll";
import ExporterStep from './ExporterStep';

class ExperimentManager {
  steps = [];

  /**
   * modify variables below
   */
  static serverUrl = "localhost:8000";

  constructor(settings) {
    const postSurveyStep = new PostSurveyStep(settings.postSurvey);
    const taskStep = new TaskStep(settings.tasks);
    const preSurveyStep = new PreSurveyStep(settings.preSurvey);
    const introStep = new IntroStep(settings.intro);
    const feedBackStep = new FeedBackStep();
    const exporterStep = new ExporterStep();

    this.steps = [introStep, preSurveyStep, taskStep, postSurveyStep, feedBackStep, exporterStep];

    this.steps.forEach((step, i) => {
      if (step != exporterStep) {
        step.setNextStep(this.steps[i + 1]);
      }
    });
  }

  launch() {
    this.steps[0].start();
    const provider = new WebTracerProvider();
    provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
    provider.addSpanProcessor(new BatchSpanProcessor(new ServerExporter(ExperimentManager.serverUrl), {
      exportTimeoutMillis: 2000,
      maxExportBatchSize: 128
    }))

    provider.register({
      // Changing default contextManager to use ZoneContextManager - supports asynchronous operations - optional
      contextManager: new ZoneContextManager(),
    });

    // Registering instrumentations
    registerInstrumentations({
      instrumentations: [
          new AlertInstrumentation(),
          new ErrorInstrumentation(),
          new ScrollInstrumentation(),
        new UserInteractionInstrumentation({
          eventNames: ['click', 'error', 'scroll', 'input', 'submit'],
        }),
      ],
    });
  }
}

export default ExperimentManager;
