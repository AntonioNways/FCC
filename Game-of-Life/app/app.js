var React = require('react');
var ReactDOM = require('react-dom');

var rowId;
var gwidth=30; //set the grids' gwidth
var gHeight=13; //set the grids' length
var genNum=0; //count the generation that the game is in
var interval;

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

function randomBoard(board){
  for(var i=0;i<gHeight;i++){
    for(var j=0;j<gwidth;j++){
      var Rnd = Math.floor(Math.random() * 10);
      var cellState="alive";
      if (Rnd>4){
        cellState="dead";
      }
      board[i][j]=cellState;
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

function cellLife(state,board,x,y){
  var NN= checkAlive(board,x,y); //number of neighbours alive
  var NewState="dead";
  if(state==="dead"){
    if (NN==3){
      NewState="alive";
      return NewState;
    }
  }
  if (state==="alive"){
    if (NN==2||NN==3){
      NewState="alive";
      return NewState;
    }
  }
  return NewState;
}

randomBoard(blankboard);

var App = React.createClass({
  getInitialState: function() {
    return { 
      "board": blankboard,
      "generation":0,
      "gamestate": "paused"
    };
  },
  renderClickChangeCell:function(cellId){ // to change the vakue of state when clicking the button
    var tempValue = Object.assign([],this.state.board);
    var a = cellId.split(",")[0]
    var b = cellId.split(",")[1]
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
  renderNextGen:function(){
    var OldBoard = Object.assign([],this.state.board);
    var NewBoard = JSON.parse(JSON.stringify(OldBoard));
    genNum=this.state.generation;
    for (var h=0;h<gHeight;h++){
      for(var w=0;w<gwidth;w++){
        var state=OldBoard[h][w];
        NewBoard[h][w]= cellLife(state,OldBoard,w,h);
      }
    }
    genNum=genNum+1;
    this.setState({ "board": NewBoard })
    this.setState({ "generation": genNum })
  },
  componentWillMount: function(){
    this.renderStartInterval();
  },
  renderResetGen:function(){
    var OldBoard = Object.assign([],this.state.board);
    if(this.state.gamestate=="on"){
      setTimeout(function() {
      clearInterval(interval)
      }, 0);
    }
    OldBoard = resetboard(OldBoard)
    this.setState({ "generation": 0 })
    this.setState({ "gamestate": "paused" })
  },
  renderStartInterval:function(){
    if(this.state.gamestate=="paused"){
      interval = setInterval(this.renderNextGen, 180);
    }
    this.setState({ "gamestate": "on" })
  },
  renderPauseGen:function(){
    if(this.state.gamestate=="on"){
      setTimeout(function() {
      clearInterval(interval)
      }, 100);
    }
    this.setState({ "gamestate": "paused" })
  },
  render: function() {
    return (
      <div>
        <center><h1>Play Game of Life</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-12 col-xs-12">
            <button className="btn btn-success spaceB" onClick={this.renderStartInterval}>Start</button>
            <button className="btn btn-info spaceB" onClick={this.renderResetGen}>Reset</button>
            <button className="btn btn-warning spaceB" onClick={this.renderPauseGen}>pause</button>
          </div>
          <div className="col-md-12 col-xs-12 Generation">
            <h4>Generation : {this.state.generation}</h4>
          </div>
          <div className="col-md-12 col-xs-12">
            <BoardPane board={this.state.board} renderClickChangeCell={this.renderClickChangeCell}/>
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
            <button key={cellId} id={cellId} className={this.props.board[rowId][y]} onClick={ChangeCell}></button>  
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