import React from 'react';
import { connect } from "react-redux";
import { addFeedback } from "../redux-store/actions";

class FeedbackBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", content: "" };
  }

  updateEmail(email) {
    this.setState({ email });
  };

  updateContent(content) {
    this.setState({ content });
  };

  handleFeedback() {
    const sessionId = window.sessionStorage.getItem("ux-test-olap-session");
    this.props.addFeedback(
      sessionId,
      this.state.email,
      this.state.content,
    );
    this.setState({ email: "", content: "" });
  };

  render() {
    const title = "Thank you for participating!";
    const description = "Please provide any additional comments you would like to share. If you would like to be contacted in the future with the study results, please leave your e-mail address.";

    const onclick = () => {
      this.handleFeedback();
      this.props.callback();
    }

    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>

        <div>
          <input
            type="email"
            onChange={e => this.updateEmail(e.target.value)}
            value={this.state.email}>
          </input>
        </div>

        <div>
          <textarea
            onChange={e => this.updateContent(e.target.value)}
            value={this.state.content}
          />
        </div>

        <button onClick={onclick}>Complete</button>
      </div>
    );
  }
}

export default connect(
  null,
  { addFeedback }
)(FeedbackBlock);

