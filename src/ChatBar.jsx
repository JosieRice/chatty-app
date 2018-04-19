import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    // taking control of the state of the input
    // for username and content
    this.state = {
      username: 'Anonymous',
      content: ''
    };
    this.onKeyPress = this.onKeyPress.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.usernameEntered = this.usernameEntered.bind(this);
  }


  usernameEntered (event) { 
    if (event.key === "Enter") 
    { 
      const username = document.getElementById('chat-username').value
      this.postUser(username, this.state.username);
      this.setState({ username });
    } 
  }

  // on Enter, it passes the username and content into the postChat function
  onKeyPress (event) { 
    if (event.key === "Enter") 
    { this.postChat(
        document.getElementById('chat-username').value,
        document.getElementById('chat-input').value);
      event.target.value = '';
    } 
  }

  // onChange event for typing in username field
  onUsernameChange (event) {
    this.setState({
      username: event.target
    });
  }

  // onChange event for typing in message field
  onContentChange (event) {
    this.setState({
      content : event.target
    });
  }

  // calls the onPostChat to change state of app.jsx
  postChat(username, content) {
    this.props.onPostChat(username, content);
  }

  postUser(username, prevName) {
    this.props.onChangeUser(username, prevName);
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
          // takes control of the state of the input field
          // onChange={this.onUsernameChange}
          />

        <input 
          id="chat-input" 
          className="chatbar-message" 
          placeholder="Type a message and hit ENTER" 
          // enter runs the postChat function and passes the input values of username and chat content
          onKeyPress={this.onKeyPress}
          // takes control of the state of input field
          onChange={this.onContentChange}
          />
    </footer>   
    );
  }
}

export default ChatBar;

