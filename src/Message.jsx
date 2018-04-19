import React, {Component} from 'react';

class Message extends Component {
  render() {
    if (this.props.type === "incomingMessage") {
      return (
        <div className="message" key={this.props.id}>
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else {
      return (
        <div className="notification">
          <span className="notification-content">{this.props.prevUsername} changed their name to {this.props.username}</span>
        </div>
      );
    }
  }
}
export default Message;
