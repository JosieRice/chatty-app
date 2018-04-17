
import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();

    // taking control of the state of the input
    // for username and content
    this.state = {
      username: '',
      content: ''
    };
    this.onContent = this.onContent.bind(this);
    this.onUsername = this.onUsername.bind(this);
  }

    // onChange event for typing in username field
    onUsername (event) {
      this.setState({
        username: event.target
      });
    }

    // onChange event for typing in message field
    onContent (event) {
      this.setState({
        content : event.target
      });
    }

    // intermediate function to call the onPostChat to change state of app.jsx
    postChat(username, content) {
      this.props.onPostChat(username, content);
    }

  render() {
    // const username = document.getElementById('chat-username');
    console.log("Rendering <ChatBar/>");
    return (
    <footer className="chatbar">
        <input 
          id="chat-username" 
          className="chatbar-username" 
          placeholder={this.state.username} 
          // takes control of the state of the input field
          onChange={this.onUsername}
          />

        <input 
          id="chat-input" 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          // enter runs the postChat function and passes the input values
          onKeyPress={(event) => 
            {if (event.key === "Enter") 
              { this.postChat(
                document.getElementById('chat-username').value,
                document.getElementById('chat-input').value) } 
            }
          }
          // takes control of the state of input field
          onChange={this.onContent}
          />
    </footer>
      
    );
  }
}
export default ChatBar;