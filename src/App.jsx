import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';

// app component is parent to all
class App extends Component {
  constructor(props) {
    super(props);
    this.onPostChat = this.onPostChat.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);

    this.state = { 
      messages : [],
      socket : ''
    }
  };

  // Immediately runs when this component has mounted (DOM is ready)
  componentDidMount() {
    this.socket = (new WebSocket("ws://localhost:3001"));
    this.socket.onopen = () => {
      console.log("Socket Open");
      // When receiving message from ws server
      // parses and adds new message to the end of message state
      this.socket.onmessage = (event) => {
        let newMessage = JSON.parse(event.data);
        let messages = this.state.messages.concat(newMessage);
        // setstate with updated information
        this.setState({ messages });
      };
    };
  };

  // function to pass to ChatBar so I can get chatbars state into the app.jsx
  onPostChat (username, content) {   
    // packages and sends a new message to socket server
    let newMessage = {type: "postMessage", username, content};
    this.socket.send(JSON.stringify( newMessage ));
  }

  onChangeUser (username) {
    let userNotification = {type: "postNotification", username};
    this.socket.send(JSON.stringify( userNotification));
  }
  
  // Main render for webapp
  render() {
    return (
    <div>
      <NavBar />
      {/* passing messages array to MessageList */}
      <MessageList messages={this.state.messages} />
      {/* passing username state to ChatBar */}
      <ChatBar onPostChat={ this.onPostChat } onChangeUser={ this.onChangeUser } />
    </div>
    )};
}

export default App;