import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        // mapping messages into array of username & messages in html format
        const messages = this.props.messages.map(message => {
            return (
                <Message 
                    key={message.id} 
                    type={message.type} 
                    id={message.id} 
                    content={message.content} 
                    username={message.username} 
                    prevUsername={message.prevUsername} 
                    color={message.color}
                />
            );
        });
    return (
        <section id="message-feed">    
            {messages}         
        </section>
    );
  }
}

export default MessageList;









