var React = require('react');
var ReactDOM = require('react-dom');
var Modal= require('react-bootstrap').Modal;

var blankboard = new Array(10);
for (var i=0;i<blankboard.length;i++){
  blankboard[i]=new Array(5);
}

var App = React.createClass({

  render: function() {
    return (
      <div>
        <center><h1>Recipe Box</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6 col-xs-6">
            {console.log(blankboard)}
          </div>
          <div className="col-md-6 col-xs-6">
          </div>
          <div>
          </div>
        </div>
      </div>
    )
  }
});


ReactDOM.render (<App />, document.getElementById("container"));