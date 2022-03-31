import React from 'react';

class FinishedBlock extends React.Component {
  render() {
    const title = "Finishing Up";
    const description = "Thank you for participating!";

    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>
      </div>
    );
  }
}

export default FinishedBlock;

