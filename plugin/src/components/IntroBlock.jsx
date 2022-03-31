import React from 'react';

class IntroBlock extends React.Component {
  render() {
    const { title, description, } = this.props.data;
    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>
        <button onClick={this.props.callback}>Begin</button>
      </div>
    );
  }
}

export default IntroBlock;
