
import React, {Component} from 'react';

class ChatBar extends Component {

 




  postChat(content) {
    console.log('in chatbar', content);
    this.props.onPostChat(content);
  }





  render() {
    const imAThing = "Cat Meow";
    console.log("Rendering <ChatBar/>");
    return (
    <footer className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser} />
        <input id="chat-input" className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={(event) => {if (event.key === "Enter") { this.postChat(imAThing) } }}/>
    </footer>
      
    );
  }
}
export default ChatBar;