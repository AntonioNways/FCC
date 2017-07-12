var React = require('react');
var ReactDOM = require('react-dom');

var rowId;
var gwidth=60; //set the grids' gwidth
var gHeight=25; //set the grids' length
var genNum=0; //count the generation that the game is in
var eHP=6;
var upgradeDmg=3;


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


function randomizingBox(board){
  var result;
  var rndHeight = Math.floor(Math.random() *(gHeight-1));
  var rndWidth = Math.floor(Math.random() *(gwidth-1));
  if(board[rndHeight][rndWidth]=="open"){
    result=[rndHeight,rndWidth]
    if(result!=[]){
      return result;
    }
  }
  randomizingBox(board);
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
      "playerHP": 100,
      "playerAtk": 8,
      "hpPack": 5, 
      "hpLocation":{},
      "weaponType": ["None","Fighter's Sword","Master Sword","Tempered Sword","Golden Sword"],
      "weaponLv": 0,  
      "WeapLoc":{},
      "PlayerLv": 1,
      "PlayerExp": 0,
      "ExpLv":[100,165,235,310,380]
    };
  },
  renderStage:function(){
    var OldBoard = Object.assign([],this.state.board);

    //HP pack
    var OldhpLocation=[];
    var HPNum=Math.round(this.state.hpPack+Math.random()*(this.state.dungeon));
    for (var i=0;i<HPNum;i++){
      var HPLoc = randomizingBox(OldBoard);//where HP pack will spawn
      OldBoard[HPLoc[0]][HPLoc[1]]="HP";
      OldhpLocation[i]=HPLoc;
    }

    //Enemy
    var ELocation=[];
    var ENum=Math.round(this.state.enemyNum+Math.random()*(this.state.dungeon*2));
    for (var j=0;j<ENum;j++){
      var ELoc = randomizingBox(OldBoard);//where HP pack will spawn
      console.log(ELoc);
      OldBoard[ELoc[0]][ELoc[1]]="Enemy";
      ELoc[2]=20+eHP*this.state.dungeon;
      ELocation[j]=ELoc;
    }
    //Weapon
    var weapLocation = randomizingBox(OldBoard);
    OldBoard[weapLocation[0]][weapLocation[1]]="weapon";

    //Player
    var startloc = randomizingBox(OldBoard); //determine where player start

    this.setState({
      "playerlocation": startloc,
      "enemyLoc": ELocation,
      "WeapLoc": weapLocation,
      "hpLocation": OldhpLocation
    })
  },
  componentWillMount: function(){
    this.renderStage();
  },
  PlayerMovement(newY,newX,){
    var OldBoard = Object.assign([],this.state.board);
    var HPArray = Object.assign([],this.state.hpLocation);
    var EnemyArray = Object.assign([],this.state.enemyLoc);

      if(newY<gHeight&&newY>-1&&newX>-1&&newX<gwidth){
        var nextloc = this.state.board[newY][newX];
        ////////////////////////////////////////
        //Enemy mechanic
        if(nextloc=="Enemy"){
          var NewEnemyArray=[];
          var Enemyatk=Math.floor(Math.random()*(5*this.state.dungeon)/2-Math.random()*(5*this.state.dungeon)/2+5+this.state.dungeon/2)
          var PlayerDmg= Math.floor(Math.random()*this.state.playerAtk/3-Math.random()*this.state.playerAtk/3+this.state.playerAtk)
          for(var h=0;h<EnemyArray.length;h++){
            if(EnemyArray[h][0]==newY&&EnemyArray[h][1]==newX){
              EnemyArray[h][2]=EnemyArray[h][2]-PlayerDmg;
              if(EnemyArray[h][2]<1){
                delete EnemyArray[h];
                OldBoard[newY][newX]="open";
                this.setState({
                  "PlayerExp": this.state.PlayerExp+15+5*this.state.dungeon,
                });  
              }
              this.setState({
                "playerHP": this.state.playerHP-Enemyatk,
              });      
            }
          }
          console.log("exp="+this.state.PlayerExp+", Hp="+this.state.playerHP)
        }  
        if(nextloc=="weapon"){
          OldBoard[newY][newX]="open";
          this.setState({
            "weaponLv": this.state.weaponLv+1,
            "playerAtk": 8+upgradeDmg+Math.round(Math.random()*2),
          });
        }
        /////////////////////////////////////////
        if(nextloc=="open"||nextloc=="HP"){
          /////////////////////////////////////////
            //game mechanic for HP pack
            if(nextloc=="HP"){
              var NewHP=[];
              OldBoard[newY][newX]="open";
              for(var h=0;h<HPArray.length;h++){
                if(HPArray[h][0]==newY&&HPArray[h][1]==newX){      
                }
                else{
                  NewHP.push([HPArray[h][0],HPArray[h][1]]); 
                }
              }
              
              this.setState({
                "playerHP": this.state.playerHP+20,
                "hpLocation": NewHP,
              });
              ////////////////////////////////////////
            //game mechanic for Sword Upgrade
              ////////////////////////////////////////
              console.log("HP="+this.state.playerHP)
            }
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
            
              <BoardPane board={this.state.board} playerlocation={this.state.playerlocation} hpLocation={this.state.hpLocation} enemyLoc={this.state.enemyLoc} WeapLoc={this.state.WeapLoc}/>
            
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
    if(this.props.board[val[0]][val[1]]=="Enemy"){
    return (
          <rect key={"y"+y+"x"+x} x={x} y={y} width="13" height="13" fill="red" stroke="red"/>
    );
    }
  },
  renderHP: function(val,h,array){ 
    var x=Number(val[1]*13);
    var y=Number(val[0]*13);
    return (
          <rect key={"y"+y+"x"+x} x={x} y={y} width="13" height="13" fill="green" stroke="green"/>
    );
  },
  renderWeapon: function(a,b){ 
    var x=Number(this.props.WeapLoc[1]*13);
    var y=Number(this.props.WeapLoc[0]*13);
    if(this.props.board[this.props.WeapLoc[0]][this.props.WeapLoc[1]]=="weapon"){
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="13" height="13" fill="yellow" stroke="yellow"/>
    );
    }
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
            {this.props.WeapLoc.map(this.renderWeapon)}
            {this.props.playerlocation.map(this.renderPlayer)}
          </svg>
        </div>
    );
  }
});


ReactDOM.render (<App />, document.getElementById("game"));