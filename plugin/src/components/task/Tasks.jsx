import React from 'react';
import TaskComponent from './TaskComponent';
import InProgressTask from './InProgressTask';

class Tasks extends React.Component {
  constructor() {
    super();
    this.state = {
      currentTask: 0,
      taskStatus: "beginTask",
    };
  }

  beginOrResumeTask() {
    const task = this.props.tasks[this.state.currentTask];
    this.props.eachTaskStart(task);
    this.setState(prevState => ({
      ...prevState,
      taskStatus: "progressTask",
    }));
  }

  endTask() {
    const task = this.props.tasks[this.state.currentTask];
    this.props.eachTaskEnd(task);

    if (this.state.currentTask >= this.props.tasks.length - 1) {
      this.props.lastTaskHasFinished();
      return;
    }

    this.setState(prevState => ({
      ...prevState,
      taskStatus: "beginTask",
      currentTask: prevState.currentTask + 1,
    }));
  }

  promptHelp() {
    this.setState(prevState => ({
      ...prevState,
      taskStatus: "helpTask",
    }));
  }

  render() {
    let component = null;
    const task = this.props.tasks[this.state.currentTask];
    const taskNum = this.state.currentTask + 1;

    if (["beginTask", "helpTask"].includes(this.state.taskStatus)) {
      component = <div id="lightbox_background">
                    <div id="lightbox">
                      <TaskComponent
                        task={task}
                        taskNum={taskNum}
                        totalTasksCount={this.props.tasks.length}
                        type={this.state.taskStatus}
                        callback={this.beginOrResumeTask.bind(this)}>
                      </TaskComponent>
                      </div>
                  </div>;
    } else {
      component = <InProgressTask
                    finishClick={this.endTask.bind(this)}
                    helpClick={this.promptHelp.bind(this)}>
                  </InProgressTask>
    }

    return component;
  }
}

export default Tasks;
