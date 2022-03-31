import React from 'react';
import QuestionOption from './QuestionOption';
import md5 from 'js-md5';


class QuestionBlock extends React.Component {
  render() {
    const { description, isRequired, options } = this.props.question;
    const nameGroup = md5(`${description}-${Math.random()}`);

    return (
      <div>
        <div>{isRequired ? description + "*" : description}</div>
        {
          options.map((option) => {
            return <QuestionOption
                      updateQuestionAnswer={this.props.updateQuestionAnswer}
                      qid={description}
                      name={nameGroup}
                      option={option}/>
          })
        }
      </div>
    );
  }
}

export default QuestionBlock;
