var React = require('react');
var ReactDOM = require('react-dom');
import $ from 'jquery';

var App = React.createClass({
  getInitialState: function() {
    return { 
      "data": {},
    };
  },
  getdata: function(type) {
      if (type=="all"){
        $.get("https://fcctop100.herokuapp.com/api/fccusers/top/alltime", function(response){
          this.setState({"data":response});
        }.bind(this));
      }
      else{
        $.get("https://fcctop100.herokuapp.com/api/fccusers/top/recent", function(response){
          this.setState({"data":response});
        }.bind(this));        
      }
  },
  componentWillMount: function(){
    this.getdata("recent");
  },
  render : function() {
    return (
      <div>
        <center><h1>Camper Leaderboard</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-12">
            <table width="90%">
              <thead>
                <tr>
                  <th width="10%">Rank</th>
                  <th width="40%">Camper Name</th>
                  <th width="25%"><a onClick={function(){this.getdata("recent")}.bind(this)}>Points in past 30</a></th>
                  <th width="25%"><a onClick={function(){this.getdata("all")}.bind(this)}>All time points </a></th>
                </tr>
              </thead>
                <TablePane data={this.state.data}/>
            </table>
          </div>
        </div>
      </div>
    )
  }
});

var TablePane = React.createClass({
  renderTableInfoPane: function(rank){
    return (
          <tr key={rank}>
            <td>{Number(rank)+1}</td>
            <td><img src={this.props.data[rank].img} height="42" width="42"/>{this.props.data[rank].username}</td>
            <td>{this.props.data[rank].recent}</td>
            <td>{this.props.data[rank].alltime}</td>
          </tr>
    );
  },
  render: function(){
    return (
        <tbody>
          {Object.keys(this.props.data).map(this.renderTableInfoPane)}
        </tbody>
    );
  }
});


ReactDOM.render (<App />, document.getElementById("container"));