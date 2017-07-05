var React = require('react');
var ReactDOM = require('react-dom');
var Modal= require('react-bootstrap').Modal;

var rowId;

var blankboard = new Array(10);
for (var i=0;i<blankboard.length;i++){
  blankboard[i]=new Array(5);
}
function resetboard(board){
  for(var i=0;i<board.length;i++){
    for(var j=0;j<board[j].length;j++){
      board[i][j]="dead";
    }
  }
}


resetboard(blankboard);

var App = React.createClass({
  getInitialState: function() {
    return { 
      "board": blankboard
    };
  },
  renderClickChangeCell:function(cellId){ // to change the vakue of state when clicking the button
    var tempValue = Object.assign([],this.state.board);
    var x = cellId.split(",")[0]
    var y = cellId.split(",")[1]
    if(tempValue[x][y]=="dead"){
      tempValue[x][y]="alive";
      this.setState({ "board": tempValue });
      console.log(x);
      return
    }
    if(tempValue[x][y]=="alive"){
      tempValue[x][y]="dead";
      this.setState({ "board": tempValue });
      return
    }
    else{
      console.log("ClickChangeCell Error");
    }
  },
  render: function() {
    return (
      <div>
        <center><h1>Play Game of Life</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-6 col-xs-12">
            {console.log(this.state)}
          </div>
          <div className="col-md-6 col-xs-12">
            <BoardPane board={this.state.board} renderClickChangeCell={this.renderClickChangeCell}/>
          </div>
          <div>
          </div>
        </div>
      </div>
    )
  }
});

var BoardPane = React.createClass({
  renderBoardCell: function(val,y){
    var cellId=rowId+","+y;
    let ChangeCell = () => this.props.renderClickChangeCell(cellId);
    return (
            <button key={cellId} id={cellId} className={this.props.board[rowId][y]} onClick={ChangeCell}>{cellId}</button>
            
    );
  },
  renderBoardRow: function(val,x){
    rowId=x;  
    return (
          <div key={"row"+x} id={"row"+x}>
            {val.map(this.renderBoardCell)}
          </div>
    );
  },
  render: function(){
    return (
        <div id="gameboard">
          {this.props.board.map(this.renderBoardRow)}
        </div>
    );
  }
});


ReactDOM.render (<App />, document.getElementById("container"));