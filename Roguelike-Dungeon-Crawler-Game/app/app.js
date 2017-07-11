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

function randomBoard(board,DGNLevel){
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

function randomizingBox(board){
  var rndHeight = Math.floor(Math.random() *(gHeight-1));
  var rndWidth = Math.floor(Math.random() *(gwidth-1));
  if(board[rndHeight][rndWidth]=="open"){
    return [rndHeight,rndWidth];
  }
  else{
    randomizingBox(board);
  }
}

resetboard(blankboard);

var App = React.createClass({
  getInitialState: function() {
    return { 
      "board": blankboard,
      "playerlocation": [],
      "gamestate": "paused",
      "dungeon": 1,
      "enemyNum":5,
      "enemyLoc": {},
      "hpPack": 5, 
      "hpLocation":{},
      "weopon": "Fist", 
      "WepLoc":{},
    };
  },
  renderStage:function(){
    var OldBoard = Object.assign([],this.state.board);

    //HP pack
    var OldhpLocation=[];
    for (var i=0;i<this.state.hpPack;i++){
      var HPLoc = randomizingBox(OldBoard);//where HP pack will spawn
      OldBoard[HPLoc[0]][HPLoc[1]]="HP";
      OldhpLocation[i]=HPLoc;
    }

    //Enemy
    var ELocation=[];
    for (var j=0;j<this.state.enemyNum;j++){
      var ELoc = randomizingBox(OldBoard);//where HP pack will spawn
      OldBoard[ELoc[0]][ELoc[1]]="Enemy";
      ELocation[j]=ELoc;
    }
    //Weapon
    var wepLocation = randomizingBox(OldBoard);
    OldBoard[wepLocation[0]][wepLocation[1]]="Weopen";

    //Player
    var startloc = randomizingBox(OldBoard); //determine where player start

    this.setState({
      "playerlocation": startloc,
      "enemyLoc": ELocation,
      "WepLoc": wepLocation,
      "hpLocation": OldhpLocation
    })
  },
  componentWillMount: function(){
    this.renderStage();
  },
  PlayerMovement(newY,newX,){
      if(newY<gHeight&&newY>-1&&newX>-1&&newX<gwidth){
        var nextloc = this.state.board[newY][newX];
        if(nextloc=="open"){
            this.setState({
              "playerlocation": [newY,newX]
            });
          return
        }
      }
  },
  playerAction:function(event){
    if(event.keyCode==40){
      this.PlayerMovement(this.state.playerlocation[0]+1,this.state.playerlocation[1])
    }
    if(event.keyCode==37){
      this.PlayerMovement(this.state.playerlocation[0],this.state.playerlocation[1]-1)
    }
    if(event.keyCode==39){
      this.PlayerMovement(this.state.playerlocation[0],this.state.playerlocation[1]+1)
    }
    if(event.keyCode==38){
      this.PlayerMovement(this.state.playerlocation[0]-1,this.state.playerlocation[1])
    }
  },
  componentDidMount(){
    document.addEventListener("keydown",this.playerAction);
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
            
              <BoardPane board={this.state.board} playerlocation={this.state.playerlocation} hpLocation={this.state.hpLocation} enemyLoc={this.state.enemyLoc} WepLoc={this.state.WepLoc}/>
            
          </div>
        </div>
      </div>
    )
  }
});

var BoardPane = React.createClass({
  renderEnemy: function(val,h,array){ 
    var x=Number(val[1]*13);
    var y=Number(val[0]*13);
    return (
          <rect key={"y"+y+"x"+x} x={x} y={y} width="13" height="13" fill="red" stroke="red"/>
    );
  },
  renderHP: function(val,h,array){ 
    var x=Number(val[1]*13);
    var y=Number(val[0]*13);
    return (
          <rect key={"y"+y+"x"+x} x={x} y={y} width="13" height="13" fill="green" stroke="green"/>
    );
  },
  renderWeopen: function(a,b){ 
    var x=Number(this.props.WepLoc[1]*13);
    var y=Number(this.props.WepLoc[0]*13);
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="13" height="13" fill="yellow" stroke="yellow"/>
    );
  },
  renderPlayer: function(a,b){ 
    var x=Number(this.props.playerlocation[1]*13);
    var y=Number(this.props.playerlocation[0]*13);
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="13" height="13" fill="blue" stroke="black"/>
    );
  },
  render: function(){
    return (
        <div id="gameboard">
          <svg width="780" height="325">
            <rect x="0" y="0" width="780" height="325" fill="white"/>
            {this.props.hpLocation.map(this.renderHP)}
            {this.props.enemyLoc.map(this.renderEnemy)}
            {this.props.WepLoc.map(this.renderWeopen)}
            {this.props.playerlocation.map(this.renderPlayer)}
          </svg>
        </div>
    );
  }
});


ReactDOM.render (<App />, document.getElementById("game"));