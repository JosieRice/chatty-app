import React, {Component} from 'react';

class MessageList extends Component {
    render() {
        // mapping messages into arrays of username & messages in html format
        const messages = this.props.messages.map(message => {
            return <div className="message" key={message.id}>
            <span className="message-username">{message.username}</span>
            <span className="message-content">{message.content}</span>
        </div>
        });



  

    console.log("Rendering <MessageList/>");
    return (
        <section>    
            {messages}         
        </section>
    );
  }
}
export default MessageList;









