var React = require('react');
var ReactDOM = require('react-dom');
var Modal= require('react-bootstrap').Modal;

var rowId;
var gwidth=80; //set the grids' gwidth
var gHeight=28; //set the grids' length
var genNum=0; //count the generation that the game is in
var eHP=8;
var upgradeDmg=6;
var enemyAttack=8;
var bossLevel=4;
var PlayerLvUPDmg=9;
var BossAttack = 55;
var bossHPS=950;
var mapWidth= gwidth*13;
var mapHeight = gHeight*13;

//setting board
var blankboard = new Array(gHeight);
for (var i=0;i<gHeight;i++){
  blankboard[i]=new Array(gwidth);
}

function resetboard(board){
  for(var i=0;i<gHeight;i++){
    for(var j=0;j<gwidth;j++){
      board[i][j]="wall"; // places where the player can walk around
    }
  }
}

function buildBox(minH,maxH,minW,maxW,board){
  for (var h=minH;h<=maxH;h++){
    for(var w=minW;w<=maxW;w++){
      board[h][w]="open";
    }
  }
  return board;
}

function chooseDirection(sh,eh,sw,ew,board,Dir){
  var newPoint;
  if(Dir=="N"){//north direction
    newPoint=Math.round(Math.random()*(ew-sw)+sw)
    return([sh-1,newPoint,"N"])
    
  }
  if(Dir=="E"){//east direction
    newPoint=Math.round(Math.random()*(eh-sh))+sh;
    return([newPoint,ew+1,"E"])

  }
  if(Dir=="S"){//south direction
    newPoint=Math.round(Math.random()*(ew-sw)+sw)
    return([eh+1,newPoint,"S"])
  }
  if(Dir=="W"){//west direction
    newPoint=Math.round(Math.random()*(eh-sh)+sh)
    return([newPoint,sw-1,"W"])
  }
  else{
    console.log("checkDirection")
  }
}

function checkRoom(H,W,Dir,board){
  var rndAdd=Math.round(Math.random() *3)+2;
  var rndAdd1=Math.round(Math.random() *3)+2;
  var H0;
  var H1;
  var W0;
  var W1;
  if (Dir=="N"){
    H0=H-rndAdd;
    H1=H-1;
    W0=W-rndAdd1;
    W1=W+rndAdd;
  }
  if (Dir=="E"){
    H0=H-rndAdd1;
    H1=H+rndAdd;
    W0=W+1;
    W1=W+rndAdd;
  }
  if (Dir=="S"){
    H0=H+1;
    H1=H+rndAdd;
    W0=W-rndAdd1;
    W1=W+rndAdd;
  }
  if (Dir=="W"){
    H0=H-rndAdd;
    H1=H+rndAdd1;
    W0=W-rndAdd;
    W1=W-1;
  }
  if([H0]<1||[H1]>gHeight-2||[W0]<1||[W1]>gwidth-2){
      return [false,1];
  }
  return [H0,H1,W0,W1];
}

function generateMap(a1,a2,b1,b2,board,DirCh){
  board = buildBox(a1,a2,b1,b2,board);
  for (var counter=0;counter<15;counter){
    var SDir=DirCh[Math.round(Math.random()*3)]
    var newPoin=chooseDirection(a1,a2,b1,b2,board,SDir);
    var newbox= checkRoom(newPoin[0],newPoin[1],newPoin[2],board);
    counter++;
    if(newbox[0]!=false){
      counter++;
      board[newPoin[0]][newPoin[1]]="open";
      board = buildBox(newbox[0],newbox[1],newbox[2],newbox[3],board)
      a1=newbox[0]
      a2=newbox[1]
      b1=newbox[2]
      b2=newbox[3]
    }
   }
}

function randomBoard(board){
  var a1=15;
  var a2=18;
  var b1=30;
  var b2=40;
  var DirE=["N","E","S","E"];
  var DirS=["S","W","S","E"];
  var DirW=["N","W","S","W"];
  var DirN=["N","E","N","W"];
  resetboard(board);
  generateMap(a1,a2,b1,b2,board,DirN);
  generateMap(a1,a2,b1,b2,board,DirE);
  generateMap(a1,a2,b1,b2,board,DirS);
  generateMap(a1,a2,b1,b2,board,DirW);
  
}

function randomizingBox(board){
  var result;
  var rndHeight = Math.round(Math.random() *(gHeight-2));
  var rndWidth = Math.round(Math.random() *(gwidth-2));
  if(board[rndHeight][rndWidth]!=="open"||board[rndHeight+1][rndWidth]!=="open"||board[rndHeight+1][rndWidth+1]!=="open"||board[rndHeight][rndWidth+1]!=="open"){
    return randomizingBox(board);
  }
  if(board[rndHeight][rndWidth]=="open"){
    result=[rndHeight,rndWidth]
    if(result!=[]){
      return result;
    }
  }
  else{
    console.log("here")
  }
}

randomBoard(blankboard);

var App = React.createClass({
  getInitialState: function() {
    return { 
      "board": blankboard,
      "playerlocation": [],
      "dungeon": 1,
      "enemyNum":5,
      "enemyLoc": {},
      "playerHP": 100,
      "playerAtk": 8,
      "hpPack": 5, 
      "hpLocation":{},
      "weaponType": ["None","Fighter's Sword","Master Sword","Tempered Sword","Golden Sword","Winning Blade","luck Sword","The Impossible blade","Sure Win Sword"],
      "weaponLv": 0,  
      "WeapLoc":{},
      "StairLoc":[0,0,true],
      "PlayerLv": 1,
      "PlayerExp": 0,
      "ExpLv":[100,160,230,310,380,450],
      "boss": bossHPS,
      "BossLoc": {},
      "darkness": true,
      "gamestate": "playing",
      isModalOpen: false
    };

  },
  renderResetG:function(){
    randomBoard(blankboard);
    this.setState({
      "dungeon": 1,
      "enemyNum":5,
      "playerHP": 100,
      "playerAtk": 8,
      "hpPack": 5,
      "weaponLv": 0,
      "PlayerLv": 1,
      "PlayerExp": 0,
      "gamestate": "playing",
      isModalOpen: false  
    });
    this.renderStage();
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
    var ENum=Math.round(this.state.enemyNum+Math.random()*(this.state.dungeon*2)/2+Math.random()*(this.state.dungeon)/2);
    for (var j=0;j<ENum;j++){
      var ELoc = randomizingBox(OldBoard);//where HP pack will spawn
      OldBoard[ELoc[0]][ELoc[1]]="Enemy";
      ELoc[2]=20+eHP*this.state.dungeon;
      ELocation[j]=ELoc;
    }
    //Weapon
    var weapLocation = []
    var wLoc=randomizingBox(OldBoard);
    OldBoard[wLoc[0]][wLoc[1]]="weapon";
    weapLocation[0]=wLoc
    var weopLuck= Math.random()*108;
    if (weopLuck<8){
      wLoc=randomizingBox(OldBoard);
      OldBoard[wLoc[0]][wLoc[1]]="weapon";
      weapLocation[1]=wLoc
    }
    
    //Stair location
    var bossLoc=[];
    if(this.state.dungeon!=bossLevel){
      var bossLocation = randomizingBox(OldBoard);
      var stairLocation = randomizingBox(OldBoard);
      OldBoard[stairLocation[0]][stairLocation[1]]="stair";
      bossLoc[0] = bossLocation;
    }
    ///BOSSS Location
    if(this.state.dungeon==bossLevel){
      stairLocation = [0,0,true];
      bossLocation = randomizingBox(OldBoard);
      OldBoard[bossLocation[0]][bossLocation[1]]="boss";
      OldBoard[bossLocation[0]][bossLocation[1]+1]="boss";
      OldBoard[bossLocation[0]+1][bossLocation[1]]="boss";
      OldBoard[bossLocation[0]+1][bossLocation[1]+1]="boss";
      bossLoc[0]=[bossLocation[0],bossLocation[1]];
      bossLoc[1]=[bossLocation[0],bossLocation[1]+1];
      bossLoc[2]=[bossLocation[0]+1,bossLocation[1]];
      bossLoc[3]=[bossLocation[0]+1,bossLocation[1]+1];
    }
    //Player
    var startloc = randomizingBox(OldBoard); //determine where player start

    this.setState({
      "playerlocation": startloc,
      "enemyLoc": ELocation,
      "WeapLoc": weapLocation,
      "StairLoc": stairLocation,
      "hpLocation": OldhpLocation,
      "BossLoc": bossLoc,
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
          var Enemyatk=Math.floor(Math.random()*(5*this.state.dungeon)/2-Math.random()*(5*this.state.dungeon)/2+enemyAttack+this.state.dungeon/2)
          var PlayerAttck= Math.floor(Math.random()*this.state.playerAtk/3-Math.random()*this.state.playerAtk/3+this.state.playerAtk)
          for(var h=0;h<EnemyArray.length;h++){
            if(EnemyArray[h][0]==newY&&EnemyArray[h][1]==newX){
              EnemyArray[h][2]=EnemyArray[h][2]-PlayerAttck;
              if(EnemyArray[h][2]<1){
                delete EnemyArray[h];
                OldBoard[newY][newX]="open";
                this.setState({
                  "PlayerExp": this.state.PlayerExp+15+5*this.state.dungeon,
                });
                ////LEVEL UP Mechanics
                if(this.state.PlayerExp>=this.state.ExpLv[this.state.PlayerLv-1]){
                  this.setState({
                  "PlayerExp": this.state.PlayerExp-this.state.ExpLv[this.state.PlayerLv-1],
                  "playerAtk": this.state.playerAtk+2+PlayerLvUPDmg*this.state.PlayerLv,
                  "PlayerLv": this.state.PlayerLv+1,
                  "playerHP": this.state.playerHP+10,
                });
                }  
              }
              this.setState({
                "playerHP": this.state.playerHP-Enemyatk,
              }); 
              if(this.state.playerHP<0){
                this.setState({
              "gamestate": "Lose",
            });
          }     
            }
          }
        }  
        if(nextloc=="weapon"){
          OldBoard[newY][newX]="open";
          this.setState({
            "weaponLv": this.state.weaponLv+1,
            "playerAtk": this.state.playerAtk+upgradeDmg+this.state.dungeon+Math.round(Math.random()*2),
          });
        }
        ///////BOSSSS
        if(nextloc=="boss"){
          var BossAtk1=Math.floor(Math.random()*BossAttack/4-Math.random()*BossAttack/4+BossAttack)
          var PlayerAttck1= Math.floor(Math.random()*this.state.playerAtk/3-Math.random()*this.state.playerAtk/3+this.state.playerAtk)
          this.setState({
            "boss": this.state.boss-PlayerAttck1,
            "playerHP": this.state.playerHP-BossAtk1,
          });
          if(this.state.playerHP<0){
            this.setState({
              "gamestate": "Lose",
            });
          }
          if (this.state.boss<0&&this.state.playerHP>=0){
            this.setState({
            "gamestate": "Win",
          });
          }
        }
        ////////////////STAIRS
        if(nextloc=="stair"){
          randomBoard(blankboard);
          this.setState({
            "board": blankboard,
            "dungeon": this.state.dungeon+1,
            "enemyNum": this.state.enemyNum+1,
            "hpPack": this.state.hpPack+1,
          });
          this.renderStage();
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
            }
            this.setState({
              "playerlocation": [newY,newX]
            });
          return
        }
      if(this.state.gamestate!=="playing"){
        this.setState({ isModalOpen: true });
      }
      }
  },
  playerAction:function(event){
    if(this.state.gamestate=="playing"){
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
    }
  },
  componentDidMount(){
    document.addEventListener("keydown",this.playerAction);
    let canvas =ReactDOM.findDOMNode(this.refs.gameWall);
    
  },
  renderDarkness:function(){
    if(this.state.darkness){
      console.log("here")
        this.setState({
          "darkness": false,
        });
    }
    else{
        this.setState({
          "darkness": true,
        }); 
    }
  },
  closeModal: function() {
    this.setState({ isModalOpen: false })
  },
  render: function() {
    return (
      <div>
        <center><h1>Dungeon Crawler</h1></center>
        <div id="header"></div>
        <div className="container">
          <div className="col-md-12 col-xs-12">
            <button className="btn btn btn-danger spaceB" onClick={this.renderResetG}>Restart</button>{" "}
            <button className="btn btn-info" onClick={this.renderDarkness}>Toggle Darkness</button>
          </div>
          <div className="col-md-12 col-xs-12">
          <table width="100%">
              <thead>
                <tr>
                  <th width="15%">HP</th>
                  <th width="15%">Attack</th>
                  <th width="20%">Weapon</th>
                  <th width="15%">Level</th>
                  <th width="15%">Experience</th>
                  <th width="15%">Dungeon Level</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>{this.state.playerHP}</th>
                  <th>{this.state.playerAtk}</th>
                  <th>{this.state.weaponType[this.state.weaponLv]}</th>
                  <th>{this.state.PlayerLv}</th>
                  <th>{this.state.PlayerExp+" / "+this.state.ExpLv[this.state.PlayerLv-1]}</th>
                  <th>{this.state.dungeon}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col-md-12 col-xs-12">
              <BoardPane board={this.state.board} playerlocation={this.state.playerlocation} hpLocation={this.state.hpLocation} enemyLoc={this.state.enemyLoc} WeapLoc={this.state.WeapLoc} StairLoc={this.state.StairLoc} dungeon={this.state.dungeon} BossLoc={this.state.BossLoc} darkness={this.state.darkness} />
          </div>
          <div>
            <ModalPane isModalOpen={this.state.isModalOpen} closeModal={this.closeModal} renderRestart={this.renderRestartG} gamestate={this.state.gamestate} renderResetG={this.renderResetG}/>
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
          <rect key={"y"+y+"x"+x} x={x} y={y} width="13" height="13" fill="red"/>
    );
    }
  },
  renderHP: function(val,h,array){ 
    var x=Number(val[1]*13);
    var y=Number(val[0]*13);
    return (
          <rect key={"y"+y+"x"+x} x={x} y={y} width="13" height="13" fill="green"/>
    );
  },
  renderWeapon: function(a,b,c){ 
    var x=Number(a[1]*13);
    var y=Number(a[0]*13);
    if(this.props.board[this.props.WeapLoc[b][0]][this.props.WeapLoc[b][1]]=="weapon"){
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="13" height="13" fill="yellow"/>
    );
    }
  },
  renderStair: function(a,b){
    if(this.props.dungeon==bossLevel){
      return
    }
    var x=Number(this.props.StairLoc[1]*13);
    var y=Number(this.props.StairLoc[0]*13);
    if(this.props.board[this.props.StairLoc[0]][this.props.StairLoc[1]]=="stair"){
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="13" height="13" fill="purple"/>
    );
    }
  },
  renderBoss:function(a,b){ 
    if(this.props.dungeon!==bossLevel){
      return
    }
    var x=Number(a[1]*13);
    var y=Number(a[0]*13);
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="15" height="15" fill="darkred"/>
    );
    
  },
  renderPlayer: function(a,b){ 
    var x=Number(this.props.playerlocation[1]*13);
    var y=Number(this.props.playerlocation[0]*13);
    return (
          <rect key={"y"+a+"x"+b} x={x} y={y} width="12" height="12" fill="blue" stroke="black" strokeWidth="1"/>
          
    );
  },
  renderBoardCell: function(val,a){
    var cellId=rowId+","+a;
    if(val=="wall"){
      return (
            <rect key={cellId} x={a*13} y={rowId*13} width="13" height="13" fill="dimgrey"/>
      );
    }
  },
  renderBoardRow: function(val,x){
    rowId=x;  
    return val.map(this.renderBoardCell)
  },
  renderDark:function(){
    if(this.props.darkness){
      return <rect x={this.props.playerlocation[1]*13-500} y={this.props.playerlocation[0]*13-500} width="1013" height="1013" fill="white" fillOpacity="0" stroke="black" strokeWidth="900"/>
    }
  },
  render: function(){
    return (
        <div id="gameboard">
          <svg width={mapWidth} height={mapHeight}>
            <rect x="0" y="0" width={mapWidth} height={mapHeight} fill="white"/>
            {this.props.board.map(this.renderBoardRow)}
            {this.props.hpLocation.map(this.renderHP)}
            {this.props.enemyLoc.map(this.renderEnemy)}
            {this.props.WeapLoc.map(this.renderWeapon)}
            {this.props.StairLoc.map(this.renderStair)}
            {this.props.BossLoc.map(this.renderBoss)}
            {this.props.playerlocation.map(this.renderPlayer)}
            {this.renderDark()}
          </svg>
        </div>
    );
  }
});

var ModalPane = React.createClass({
    ConfirmRestart:function(){
      this.props.renderResetG();
    },
    render: function(){
    let close = () => this.props.closeModal();
    return (
      <Modal show={this.props.isModalOpen} onHide={close} bsSize="small">
        <Modal.Header>
          <Modal.Title id="contained-modal-title" className="ModalWords"><center>{"You "+this.props.gamestate+"!!!"}</center></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center className="ModalWords">Would you like to restart the game?</center>
        </Modal.Body>
        <Modal.Footer> <center>
          <button type="button" className="btn btn-primary" onClick={this.ConfirmRestart} id="Restart">Yes</button>
          <button type="button" className="btn btn-primary" onClick={close} id="Close">No</button> </center>
        </Modal.Footer>
      </Modal>
    );
  },
});

ReactDOM.render (<App />, document.getElementById("game"));