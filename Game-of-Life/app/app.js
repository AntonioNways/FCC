var React = require('react');
var ReactDOM = require('react-dom');
var Modal= require('react-bootstrap').Modal;

var rowId;
var gwidth=17; //set the grids' gwidth
var gHeight=8; //set the grids' length

//setting board
var blankboard = new Array(gHeight);
for (var i=0;i<gHeight;i++){
  blankboard[i]=new Array(gwidth);
}

function resetboard(board){
  for(var i=0;i<gHeight;i++){
    for(var j=0;j<gwidth;j++){
      board[i][j]="dead";
    }
  }
}

// function to determine the number of neighbour alive cells exist
function checkAlive(board,cellX,cellY){
  var counter=0; //track the number of alive cell when checking
  var x;
  var y;
  for (var i=-1;i<2;i++){
    x=Number(cellX)+i;
    y=Number(cellY)-1;
    if (y<0){
      break
    }
    if(board[y][x]==="alive"){
      counter=counter+1;
    }
  }
  for (var i=-1;i<2;i++){
    x=Number(cellX)+i;
    y=Number(cellY)+1;
    if (y>gHeight-1){
      break
    }
    if(board[y][x]==="alive"){
      counter=counter+1;
    }
  }
  if(Number(cellX)+1<=gwidth&&Number(cellX)-1>-2){
    if(board[Number(cellY)][Number(cellX)+1]==="alive"){
      counter=counter+1;
    }
    if(board[Number(cellY)][Number(cellX)-1]==="alive"){
      counter=counter+1;
    }
  }
  return counter
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
    var a = cellId.split(",")[0]
    var b = cellId.split(",")[1]

    console.log(checkAlive(tempValue,b,a));
    if(tempValue[a][b]=="dead"){
      tempValue[a][b]="alive";
      this.setState({ "board": tempValue });
      return
    }
    if(tempValue[a][b]=="alive"){
      tempValue[a][b]="dead";
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