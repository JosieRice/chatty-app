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
      numFriends: 0,
    }
  };

  // Immediately runs when this component has mounted (DOM is ready)
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001");
    this.socket.onopen = () => {
      console.log("Socket Open");
      // When receiving message from ws server
      // parses and adds new message to the end of message state
      this.socket.onmessage = (event) => {
        // sets state on number of users changed
        const newMessage = JSON.parse(event.data);
        console.log("NEW MESSAGE ON APP", newMessage);
        if (newMessage.type === "newFriendsCount") {
          this.setState({ numFriends : newMessage.numFriends })
        } else {
          // set state for messages
          const messages = this.state.messages.concat(newMessage);
          // setstate with updated information from server
          this.setState({ messages });
          console.log("STATE ON APP AFTER MESSAGE CLEARED", this.state);
          
      }
      }
    };
  };

  // function to pass to ChatBar so I can get chatbars state into the app.jsx
  onPostChat (username, content) {   
    // packages and sends a new message to socket server
    const newMessage = {type: "postMessage", username, content};
    this.socket.send(JSON.stringify( newMessage ));
  }

  onChangeUser (username, prevUsername) {
    const userNotification = {type: "postNotification", username, prevUsername};
    this.socket.send(JSON.stringify( userNotification));
  }
  
  // Main render for webapp
  render() {
    return (
    <div>
      <NavBar friends={ this.state.numFriends } />
      {/* passing messages array to MessageList */}
      <MessageList messages={this.state.messages} />
      {/* passing username state to ChatBar */}
      <ChatBar onPostChat={ this.onPostChat } onChangeUser={ this.onChangeUser } />
    </div>
    )};
}

export default App;


/*

ADDING NUMBER OF LOGGED IN USERS


- pass this state to chatbar
- add notification with number of people updating in chatbar



*/