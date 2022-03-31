import React from 'react';

class QuestionOption extends React.Component {
  
  render() {
    const onclick = () => {
      this.props.updateQuestionAnswer({
        [this.props.qid]: this.props.option,
      });
    }

    return (
      <div>
        <input
          type="radio"
          name={this.props.name}
          onClick={onclick}
        />
        {this.props.option}
      </div>
    );
  }
}

export default QuestionOption;
