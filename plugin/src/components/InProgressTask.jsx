import React from 'react';

class InProgressTask extends React.Component {
  constructor() {
    super();
    this.state = { answers: [] };
  }

  render() {

    const confirmFinish = () => {
      const confirmEnd = window.confirm('Are you sure you want to finish this task?');
      if (confirmEnd) {
       this.props.finishClick();
      }
    }

    return (
      <div className="during-task-block">
        <div className="task-help" onClick={this.props.helpClick}>?</div>
        <div className="finish-task-button" onClick={confirmFinish}>Finish Task</div>
      </div>
    );
  }
}

export default InProgressTask;
