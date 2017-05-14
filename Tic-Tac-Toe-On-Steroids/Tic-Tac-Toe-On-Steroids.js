// this sets up a Player object and returns a new Player with a method init that expects arguments 
var Player = function(name, symbol){  
  return new Player.init(name, symbol)
}   

// returning function from calling Player.init, which is expecting 2 params
Player.init = function(name, symbol){
  var self = this;
  self.name = name || 'Player';
  self.symbol = symbol;  
  self.score = 0; 
  self.myTurn= false;
}


// this is a clear way to setup the new object prototype
Player.prototype = {
   
  placeSym:function(player, node){
    $(node).text(player.symbol).css('color', randomColor())
    
    // player.mySpots(node, player.array)
  },
  mySpots:function(node, arr){  
    arr.push(node.id)  
    return arr;   
  },  
  // this is the function that gets call to play every time a spot is click and carries on with the rest of the game(functions) 
  play:function turn(player){ 
    $('td').off().on('click',function(e){   
      e.preventDefault(); 
      if (Board.checkSpotsAvailable(this)) {  
        player.placeSym(player, this)
         
        var newArr = Board.updateBoad()
        if (Board.winnerCombination(newArr, player)) {
          Board.updateScore(player)
          Board.winOrTie('#success', '#win', `${player.name} Wins`);         
        }
        if(Board.tie()){
          Board.winOrTie('#danger', '#tie', `${player.name} is a tie men`)  
        }
        start()  
      } else {
        Board.notification('-5rem', randomColor(), '', "Spot is taken")
      }
    })       
  }, 
  // this function determines whos turn is it, it is called from start function. first it uses Math.random to get a different player each first turn then just regular turns
  turn:function(player1, player2){
    let turn = Math.random();    
    if(turn > 0.5){ 
      player2.myTurn = false;
      player1.myTurn = true;
      Board.notification('-5rem', randomColor(), player1.name)
      return player1 
    } else if (turn < 0.5){ 
      player1.myTurn = false;    
      player2.myTurn = true;   
      Board.notification('-5rem', randomColor(), player2.name)
      return player2;         
    }  
  }, 
  // this function starts the game after the playerCreation face and its called from player every time.  thisfunction to determine whos turn is it and assign notifications and set the turns depending on players state
  start:function(player1,player2){   
    return function(){
      if(player1.myTurn == false && player2.myTurn == false){
        let currentPlayer = Player.prototype.turn(player1, player2)
        currentPlayer.play(currentPlayer) 
      } else if(player1.myTurn === true){
        player1.myTurn = false; 
        player2.myTurn = true; 
        Board.notification('5rem', randomColor(), player2.name)
        player2.play(player2);      
      } else if (player2.myTurn === true){     
        player2.myTurn = false;  
        player1.myTurn = true; 
        Board.notification('-15rem', randomColor(), player1.name)
        player1.play(player1)  
      }   
    }  
  },
  // increases the player score
  playerScore:function(player){
    player.score++
    return player.score
  }
     
} 

// this sets the player.init.proto to equals the definition of Player.proto on top
Player.init.prototype = Player.prototype;

  

// Board object with methods attached
var Board = { 
  // update the board with the placed symbol 
  updateBoad:function(){
    var newArr =[];
    var ids = document.querySelectorAll('td')
    for (i in ids){ 
      newArr.push(ids[i].innerHTML)
    }
     return newArr    
  },  
  // check the winner combination of the rows,columns and diagonal possible winner combinations
  winnerCombination:function(arr, player){ 
    if (this.checkWinnerArray([arr[0],arr[1],arr[2]], player.symbol) ||
        this.checkWinnerArray([arr[3],arr[4],arr[5]], player.symbol) ||
        this.checkWinnerArray([arr[6],arr[7],arr[8]], player.symbol) ||
        this.checkWinnerArray([arr[0],arr[3],arr[6]], player.symbol) ||
        this.checkWinnerArray([arr[1],arr[4],arr[7]], player.symbol) ||
        this.checkWinnerArray([arr[2],arr[5],arr[8]], player.symbol) ||
        this.checkWinnerArray([arr[0],arr[4],arr[8]], player.symbol) ||
        this.checkWinnerArray([arr[2],arr[4],arr[6]], player.symbol)      
       ) {
      return true;
    }   
    return false;
  }, 
  // check if all of the elements on the passed arrays equals the player symbol
  checkWinnerArray:function (arr, symbol){ 
    var newArr = []; 
    newArr = arr.every(function(item) { 
      return item == symbol;
    })
    return newArr
  }, 
  // self explanatory
  checkSpotsAvailable:function(node){
    if(node.innerText != ''){
      return false;  
    }
    return true;
  },
  // sends notifications to player as of whos turn it is and if spot is available or not
  notification: function(direction,color, name, tie){
    var cssObj = {
      ['margin-left']: direction,
      background: [color], 
      display:'inline-block' 
    }
    $('#toggle').hide()
    $('#toggle').css(cssObj).text(name + " your turn " )
    if(tie) {
      $('#toggle').css(cssObj).text(tie)
    }
    $('#toggle').toggle('puff', 1500)    
  },   
  updateScore:function(player){  
    if(player.name == "Computer") { 
      var id = $('#computerScore') 
    }
    else {
      var id = $('#playerScore') 
    }
    $(id).html(player.playerScore(player)).css('color', randomColor())
    
  },
  name:function(name){
    var playerName = name || 'No Name Then'  
    $('#player').text(playerName + ":")
  },
  finish:function(){ 
    $('td').html('')
  },
  winOrTie: function(modal, id, message){
    $('#success').find('h1:first').text(message)
    $(modal).modal()
    $(id).submit(function(e){
      e.preventDefault()
      var btn= $(this).find("button[type=submit]:focus").val();
      if (btn == 'yay') {
        Board.finish()  
      } else if (btn == 'nay'){
        $(modal).modal('hide') 
        $('body').animate({opacity:0}, 2000,function(){
          $(this).text("LOOSER").css({
            'position' : 'absolute',
            'left' : '20%',
            'top' : '40%',    
            'font-size':'300px'
          }).animate({opacity:1},3000);   
        });
      }  
      $("#success").modal('hide')
    })
  }, 
  tie:function(){
    let node = document.querySelectorAll('td');
    node = Array.prototype.slice.call(node)
    let boardLength = node.filter(item => item.innerText != '')
    if (boardLength.length == 9){
      return true;
    }
    return false;
  }
}   
   
function randomColor(){
  var randomColor = Math.floor(Math.random()*16777215).toString(16);
  randomColor = '#' + randomColor; 
  return randomColor;  
}
$('#looser').on('click', function(){
  alert("Ha ha such a looser")
})
var player1;
var player2;
var start;

function playerCreation(){
  $('#start').modal({
    backdrop: 'static',
    keyboard: false
  });
  $('#myForm').submit(function(e){
    e.preventDefault(); 
    $('#start').modal('hide')    
    Board.name(pepe.value)  
    var symbol = $('input[name="playerSymbol"]:checked').val();
    symbol = symbol || 'X';
    player1 = Player(pepe.value, symbol)
    if(player1.symbol == 'Y') { 
      player2 = Player('Computer', 'X')
    } else {  
      player2 = Player('Computer', 'Y')   
    }  
     
    start = Player.prototype.start(player1, player2)
    start()  
    return false;
  }) 
}
playerCreation()