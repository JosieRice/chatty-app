import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.onPostChat = this.onPostChat.bind(this);

    // temporary data to play with
    this.state = {messages: [
      {
          id: "abc1",
          type: "incomingMessage",
          content: "I won't be impressed with technology until I can download food.",
          username: "Anonymous1"
      },
      {
          id: "abc2",
          type: "incomingNotification",
          content: "Anonymous1 changed their name to nomnom",
      },
      {
          id: "abc3",
          type: "incomingMessage",
          content: "I wouldn't want to download Kraft Dinner. I'd be scared of cheese packet loss.",
          username: "Anonymous2"
      },
      {
          id: "abc4",
          type: "incomingMessage",
          content: "...",
          username: "nomnom"
      },
      {
          id: "abc5",
          type: "incomingMessage",
          content: "I'd love to download a fried egg, but I'm afraid encryption would scramble it",
          username: "Anonymous2"
      },
      {
          id: "abc6",
          type: "incomingMessage",
          content: "This isn't funny. You're not funny",
          username: "nomnom"
      },
      {
          id: "abc7",
          type: "incomingNotification",
          content: "Anonymous2 changed their name to NotFunny",
      
      },
      
  ]};
  
  }

  


    
    onPostChat (content) {
      console.log("In app.jsx", content);
      // adds a new message to list of messages in data state
      const newMessage = {id: "abc8", username: content, content: "Purrrr"};
      const messages = this.state.messages.concat(newMessage);
      // update the state in app
      // setstate with updated information
      this.setState({ messages })
    };
  


  



  render() {
    console.log("Rendering <App/>");
    return (
    <div>
      <NavBar />
      {/* passing messages array to MessageList */}
      <MessageList messages={this.state.messages} />
      {/* passing username state to ChatBar */}
      <ChatBar onPostChat={ this.onPostChat } currentUser={this.state.messages[0].username} />
    </div>
    )};
}
export default App;