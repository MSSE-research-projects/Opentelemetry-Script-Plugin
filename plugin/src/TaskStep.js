import Step from './Step';
import Tasks from './components/task/Tasks';
import { trace } from '@opentelemetry/api';

const tracer = trace.getTracer("step-tracer", "0.1.0");

function sendTaskEndSignal({ _id: taskId }) {
  tracer.startSpan("task-end", {
    attributes: {
      event_type: "task",
      "http.url": window.location.href,
      "http.user_agent": navigator.userAgent,
    },
  }).end();
}

function sendTaskStartSignal({ _id: taskId }) {
  tracer.startSpan("task-start", {
    attributes: {
      event_type: "task",
      "http.url": window.location.href,
      "http.user_agent": navigator.userAgent,
    },
  }).end();
}

class TaskStep extends Step {
  tasks = [];

  constructor(tasks) {
    super();
    this.tasks = tasks;
  }

  start() {
    const props = {
      tasks: this.tasks,
      lastTaskHasFinished: this.triggerNextStep.bind(this),
      eachTaskStart: sendTaskStartSignal,
      eachTaskEnd: sendTaskEndSignal,
    }
    this.renderComponent(Tasks, props, this.rootElement);
  }
}

export default TaskStep;
