import React, {Component} from 'react';

class NavBar extends Component {
  render() {
    console.log("Rendering <NavBar/>");
    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-user-count">{this.props.friends} Users Feeling Chatty</p>
      </nav>
    );
  }
}
export default NavBar;





