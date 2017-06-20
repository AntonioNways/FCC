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
          <div className="col-md-12">
            <TablePane/>
            {console.log(this.state.data)};
            {Object.keys(this.state.data)};
          </div>
        </div>
      </div>
    )
  }
});

var TablePane = React.createClass({
  render: function(){
    return (
      <table width="90%">
        <thead>
          <tr>
            <th width="10%">Rank</th>
            <th width="40%">Camper Name</th>
            <th width="25%">Points in past 30 <days></days></th>
            <th width="25%">All time points </th>
          </tr>
        </thead>
        <tbody>
          To be added
        </tbody>
      </table>
    );
  }
});

ReactDOM.render (<App />, document.getElementById("container"));