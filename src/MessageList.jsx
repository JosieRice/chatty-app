import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        let messages = this.props.messages;
        // mapping name and messages into arrays with html attached   
        let messagePrintout = messages.map(chat => 
        <div className="message" key={chat.id}>
            <span className="message-username">{chat.username}</span>
            <span className="message-content">{chat.content}</span>
        </div>);

    console.log("Rendering <MessageList/>");
    return (
        <div>    
            {messagePrintout}         
        </div>
    );
  }
}
export default MessageList;









