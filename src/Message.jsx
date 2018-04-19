import React, {Component} from 'react';

class Message extends Component {
  render() {
    // console.log("COLOR IN END OF MESSAGES", this.props.color);
    if (this.props.type === "incomingMessage") {
      const userColor = this.props.color;
      const fontColorStyle = {
        color: userColor,
      }
      return (
        <div className="message" key={this.props.id}>
          <span className="message-username" style={fontColorStyle}>{this.props.username} says:</span>
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
