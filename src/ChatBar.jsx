import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    // for storing last updated username
    this.state = {
      username: 'Anonymous',
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.usernameEntered = this.usernameEntered.bind(this);
  }

  // on Enter, it passes the username and content into the postChat function
  onKeyPress (event) {
    if (event.key === "Enter") {
      const username = document.getElementById('chat-username').value;
      this.props.onPostChat(
        username,
        document.getElementById('chat-input').value
      );
      // clears message input field
      event.target.value = '';
      // sets state username if it's new
      if (this.state.username !== username) {
        this.setState({ username })
      }
    } 
  }

  // sends previous and new username info to app.jsx function and sets new currentUser.
  usernameEntered (event) { 
    if (event.key === "Enter") { 
      const username = document.getElementById('chat-username').value
      this.props.onChangeUser(username, this.state.username);
      this.setState({ username });
    } 
  }

  render() {
    return (
      <footer className="chatbar">
        <input 
          id="chat-username" 
          className="chatbar-username" 
          placeholder="And you are...?" 
          // sends notification when a user changes their username
          onKeyPress={this.usernameEntered}
        />

        <input 
          id="chat-input" 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          // enter runs the postChat function and passes the input values of username and chat content
          onKeyPress={this.onKeyPress}
        />
      </footer>  
    );
  }
}

export default ChatBar;

