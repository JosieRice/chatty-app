import React, {Component} from 'react';
import NavBar from './NavBar.jsx';
import MessageList from './MessageList.jsx';
import ChatBar from './ChatBar.jsx';
import messages from './data.json';

class App extends Component {
  constructor(props) {
    super(props);
    this.onPostChat = this.onPostChat.bind(this);
    // data from data.JSON file set as state
    this.state = { 
      messages : messages,
      socket : (new WebSocket("ws://localhost:3001"))
     }; 
  }


  componentDidMount() { 
    (() => {
      this.state.socket.onopen = () => {
        console.log("Socket Open");
        this.state.socket.send(JSON.stringify( messages ));
        this.state.socket.onmessage = function(data) {
          this.setState({ messages : data })
          console.log(data);
        }
      }
    })();
  
  }



    // function to pass to ChatBar to update chat log
    onPostChat (username, content) {
      // gives index number to be used for key
      // not a great solution, but works for now
      let total = this.state.messages.length + 1;

      // packages a new message to an object with an id and info from input fields
      const newMessage = {id: total, username: username, content: content};
      // adds a new message to list of messages in data state
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
      <ChatBar onPostChat={ this.onPostChat } />
    </div>
    )};
}

export default App;