var React = require('react');
var ReactDOM = require('react-dom');

var rowId;
var gwidth=60; //set the grids' gwidth
var gHeight=25; //set the grids' length
var genNum=0; //count the generation that the game is in


//setting board
var blankboard = new Array(gHeight);
for (var i=0;i<gHeight;i++){
  blankboard[i]=new Array(gwidth);
}

function resetboard(board){
  for(var i=0;i<gHeight;i++){
    for(var j=0;j<gwidth;j++){
      board[i][j]="open"; // places where the player can walk around
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

function initialPlayerLocation(board){
  var playerlocation =[];
  var rndHeight = Math.round(Math.random() *gHeight);
  var rndWidth = Math.round(Math.random() *gwidth);
  if(board[rndHeight][rndWidth]=="open"){
    return [rndHeight,rndWidth];
  }
  else{
    initialPlayerLocation(board);
  }
}

resetboard(blankboard);

var App = React.createClass({
  getInitialState: function() {
    return { 
      "board": blankboard,
      "playerlocation": [],
      "gamestate": "paused"
    };
  },
  renderStage:function(){
    var OldBoard = Object.assign([],this.state.board);
    var startloc = initialPlayerLocation(this.state.board); //determine where player start
    this.setState({
      "playerlocation": startloc
    })
  },
  componentWillMount: function(){
    this.renderStage();
  },
  render: function() {
    return (
      <div>
        <center><h1>Dungeon Crawler</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-12 col-xs-12">
          </div>
          <div className="col-md-12 col-xs-12">
          </div>
          <div className="col-md-12 col-xs-12">
            
              <BoardPane board={this.state.board} playerlocation={this.state.playerlocation} />
            
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
            <a key={cellId} id={cellId} className={this.props.board[rowId][y]}></a>
             
    );
  },
  renderBoardRow: function(val,x){
    rowId=x;  
    return (
          <div key={"row"+x} id={"row"+x}>
            {val.map(this.renderBoardCell)} 
            {console.log(this.props.playerlocation)}
          </div>
    );
  },
  renderPlayer: function(val){ 
    var x=Number(this.props.playerlocation[1]*13);
    var y=Number(this.props.playerlocation[0]*13);
    return (
          <rect key={val} x={x} y={y} width="13" height="13" fill="pink"/>
    );
  },
  render: function(){
    return (
        <div id="gameboard">
          <svg width="780" height="325">
            <rect x="0" y="0" width="780" height="325" fill="white"/>
            {this.props.board.map(this.renderBoardRow)}
            {this.props.playerlocation.map(this.renderPlayer)}
          </svg>
        </div>
    );
  }
});


ReactDOM.render (<App />, document.getElementById("game"));