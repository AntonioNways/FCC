var React = require('react');
var ReactDOM = require('react-dom');
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function() {
    return { 
      "data": {}
    };
  },
  getdata: function() {
      $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function(response){
        this.setState({data:response});
      }.bind(this));
  },
  componentWillMount: function(){
    this.getdata();
  },
  render : function() {
    return (
      <div>
        <center><h1>Camper Leaderboard</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6">
            {console.log(this.state.data)};
            {Object.keys(this.state.data)};
          </div>
        </div>
      </div>
    )
  }
});


ReactDOM.render (<App />, document.getElementById("container"));