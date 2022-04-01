import React from 'react';

class TaskBlock extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { taskTitle, scenario, taskDesc } = this.props.task;

    return (
      <div className="task-block">
        <div className="task-block-header">
          <div>Task {this.props.taskNum} out of {this.props.totalTasksCount}</div>
          <div>{taskTitle}</div>
        </div>
        <div className="task-block-center">
          <p>
            You are about begin task {this.props.taskNum} of the usability study
            <br/><br/>
            <u>Scenario</u>: {scenario}
            <br/><br/>
            <u>Task:</u> {taskDesc}
            <br/><br/>
            Please click on <b>Begin Task</b> to start the task, and click on <b>Finish Task</b> button to end the task.
            <br/><br/>
            (If you want to view the task descriptions again during the test, click on <b>?</b> button.)
          </p>
        </div>
        <div className="task-block-footer">
          <span onClick={this.props.callback}>
            {this.props.type === "beginTask" ? "Begin Task" : "Return"}
          </span>
        </div>
      </div>
    );
  }
}

export default TaskBlock;
