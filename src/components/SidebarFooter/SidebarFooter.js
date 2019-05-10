import React, {Component} from 'react';

class SidebarFooter extends Component{

  handleClick = (e) => {
    e.preventDefault();
  }

  render(){
    return(
      <div className="sidebar-footer hidden-small">
        <a href="index.html" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="Settings">
          <span className="glyphicon glyphicon-cog" aria-hidden="true"></span>
        </a>
        <a href="index.html" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="FullScreen">
          <span className="glyphicon glyphicon-fullscreen" aria-hidden="true"></span>
        </a>
        <a href="index.html" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="Lock">
          <span className="glyphicon glyphicon-eye-close" aria-hidden="true"></span>
        </a>
        <a href="index.html" onClick={this.handleClick} data-toggle="tooltip" data-placement="top" title="Logout">
          <span className="glyphicon glyphicon-off" aria-hidden="true"></span>
        </a>
      </div>
    );
  }
}

export default SidebarFooter;
