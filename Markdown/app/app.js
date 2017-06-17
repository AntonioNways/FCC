var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  render : function() {
    return (
      <div>
        <center><h1>Markdown Previewer</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="column">
          </div>
          <div className="column"></div>
          <div className="column"></div>
        </div>
      </div>
    )
  }
});

ReactDOM.render (<App />, document.getElementById("container"));