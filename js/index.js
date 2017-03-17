$(document).ready(function(){
  
  //init html
  var v_init_html='<div class="out-container"><div class="in-container"><h1 id="question">How do you want to play?</h1><a href="#" id="leftspan"><span id="oneplayer">One player</span></a><a href="#" id="rightspan"><span id="twoplayer">Two player</span></a></div></div>';
  
  //click oneplayer or twoplayer button's html
  var v_playernum_html='<h1 id="question">How do you want to play?</h1><a href="#" id="leftspan"><span id="oneplayer">One player</span></a><a href="#" id="rightspan"><span id="twoplayer">Two player</span></a>';
 
  // click  X or O token  html
  var v_choose_token_html='<h1 id="question">Would you like to be X or O?</h1><a href="#" id="leftspan"><span id="X">X</span></a><a href="#" id="rightspan"><span id="O">O</span></a><h2><a href="#" id="backtoinit">Back</a></h2>';
  
  // play  html 2players
 var v_play_html2='<span id="player1Hint">Player1</span><span id="player2Hint">Player2</span><div class="out-container"><button id="resetbtn">Reset</button><div class="in-container"><span id="one" class="playbox hitcontrol" value="00"></span><span id="two" class="playbox hitcontrol" value="01"></span><span id="three" class="playbox hitcontrol" value="02"></span><span id="four" class="playbox hitcontrol" value="10"></span><span id="five" class="playbox hitcontrol" value="11"></span><span id="six" class="playbox hitcontrol" value="12"></span><span id="seven" class="playbox hitcontrol" value="20"></span><span id="eight" class="playbox hitcontrol" value="21"></span><span id="nine" class="playbox hitcontrol" value="22"></span></div></div>';
  
   // play  html 1 player
 var v_play_html1='<span id="player1Hint">Player1</span><span id="player2Hint">Computer</span><div class="out-container"><button id="resetbtn">Reset</button><div class="in-container"><span id="one" class="playbox hitcontrol" value="00"></span><span id="two" class="playbox hitcontrol" value="01"></span><span id="three" class="playbox hitcontrol" value="02"></span><span id="four" class="playbox hitcontrol" value="10"></span><span id="five" class="playbox hitcontrol" value="11"></span><span id="six" class="playbox hitcontrol" value="12"></span><span id="seven" class="playbox hitcontrol" value="20"></span><span id="eight" class="playbox hitcontrol" value="21"></span><span id="nine" class="playbox hitcontrol" value="22"></span></div></div>';
  
  //Flag of Player number,0 for initial state, 1 for one player, 2 for two players
  var playerNum=0;
  
  //Flag of players's icon,0 for initial state, O for circle, X for X
  var player1Icon=0;
  var player2Icon=0;
  
  // player's value , to  tell  who win
  var player1Val=2;
  var player2Val=3;
  
  //current  player
  var curPlayer="Player1";
  
  //current  playerIcon
  var curPlayerIcon="O";
  
  // name of player, if 2 players, player2 name change to player2
  var player1Name="Player1";
  var player2Name="Computer";
  var curPlayerName=player1Name;
  
  // hint to go for players, if two players player1Hint is "Go Player1!", player2Hint is "Go Player2!"
  var player1Hint="Your turn";
  var player2Hint="Computer's turn";
  
  //Flag of who  play first, default  player1,1 for player1  2 for player 2
  var whoFirst=1;
  
  //  initial  value of  board  0. and 1 for  X , 2 for  O
  var v_board=[[1,1,1],[1,1,1],[1,1,1]];
  //alert($('#one').attr("value"));
  // click one player button, change to page to select icon, playerNum=1
  
  $('.main-container').on('click','.out-container .in-container #oneplayer',function(){
    $('.in-container').html(v_choose_token_html);
    playerNum=1;
    
  });
  
  //click  back  to init html
  
  $('.main-container').on('click','.out-container .in-container #backtoinit',function(){
    $('.in-container').html(v_playernum_html);
    $(".out-container").css("padding-top","30px");
    $(".out-container").css("padding-bottom","30px");
    playerNum=0;
  });
  
  // click two player button, change to page to select icon, playerNum=2, player2Name="player2", player1Hint="Go Player1!", player2Hint="Go Player2!"
  $('.main-container').on('click','.out-container .in-container #twoplayer',function(){
    $('.in-container').html(v_choose_token_html);
    playerNum=2;
  });
  
  // current  value  
  var v_curVal=player1Val;
  
  // click to choose icon,change to page of play
  $('.main-container').on('click','.out-container .in-container #X',function(){
    // Todo:random to see who go first
    if(playerNum==2){
    $('.main-container').html(v_play_html2);player2Name='Player2';}else{$('.main-container').html(v_play_html1);player2Name='Computer'};
    $(".out-container").css("padding-top","10px");
    $(".out-container").css("padding-bottom","70px");
    player1Icon='X';
    player2Icon='O';
    
    //set current player info
    curPlayer="Player1";
    v_curVal=player1Val;
    curPlayerIcon=player1Icon;
    curPlayerName=player1Name;
  });
  
  $('.main-container').on('click','.out-container .in-container #O',function(){
    if(playerNum==2){
    $('.main-container').html(v_play_html2);player2Name='Player2';}else{$('.main-container').html(v_play_html1);player2Name='Computer';};
    $(".out-container").css("padding-top","10px");
    $(".out-container").css("padding-bottom","70px");
    player1Icon='O';
    player2Icon='X';
    
     //set current player info
    curPlayer="Player1";
  v_curVal=player1Val;
  curPlayerIcon=player1Icon;
    curPlayerName=player1Name;
  });
 

 // click  event on  playbox
    $('.main-container').on('click','.out-container .in-container .hitcontrol',function(){
    $(this).text(curPlayerIcon);
      var v_tmp=$(this).attr("value");
    var i=v_tmp.substr(0,1);
    var j=v_tmp.substr(1,1);
     v_board[i][j]=v_curVal;
     
     isWin(i,j);
      isEnd();
   switchTurn();
     
     
      
    // when  being  chosen  can't  not be click  again , remove  the  correspoding   control class to  implent  it
    $(this).removeClass('hitcontrol');
    
     // if one  player , computer play   
     if(playerNum==1){
       //var t= setTimeout("var v_wait=100;v_wait=1000;",5000);
       setTimeout(chooseToe,1000);
       // chooseToe();
     } 
      
  });
     
    //click reset button  to  reset
  $(".main-container").on("click",".out-container #resetbtn",function(){
    resetAll();
  });
  
    // funciton : random seed to decide who go first
  
  // funciton :  switchTurn,  change to  the other player
  function switchTurn(){
    //if(curPlayerIcon=='X'){curPlayerIcon='O';}
    //else{curPlayerIcon='X';}
    if(curPlayer=='Player1'){curPlayer='Player2';curPlayerIcon=player2Icon;v_curVal=player2Val;curPlayerName=player2Name;$("#player1Hint").delay(600).hide(0);$("#player2Hint").delay(600).show(0);}
  else{curPlayer='Player1';curPlayerIcon=player1Icon;v_curVal=player1Val;curPlayerName=player1Name;$("#player2Hint").delay(600).hide(0);$("#player1Hint").delay(600).show(0);}
  //  if(v_curVal==2){v_curVal=3;}
//    else{v_curVal=2;}
    
  }
  
  //init  count
  var v_cnt=1;
  
  // function:  isWin()
  function isWin(i,j){
    
    //vertical
    v_cnt=1;
    for(var k=0;k<3;k++){
      v_cnt*=v_board[k][j];
      }
    // alert(v_cnt);
    if(v_cnt==8||v_cnt==27){alert(curPlayerName+" Win!");clearAll();return;}
    
    //horizen
    v_cnt=1;
    for(var k=0;k<3;k++){
      v_cnt*=v_board[i][k];
      }
    
    if(v_cnt==8||v_cnt==27){alert(curPlayerName+" Win!");clearAll();return;}
    
    //leftup rightdown
    v_cnt=1;
    for(var k=0;k<3;k++){
      v_cnt*=v_board[k][k];
      }
  
    if(v_cnt==8||v_cnt==27){alert(curPlayerName+" Win!");clearAll();return;}
    
    //rightup leftdown
    v_cnt=1;
    for(var k=0;k<3;k++){
      v_cnt*=v_board[k][2-k];
      }
  
    if(v_cnt==8||v_cnt==27){alert(curPlayerName+" Win!");clearAll();return;}
    
    
  };
  
  //function:clearAll(),clear play icon
  function clearAll(){
    if(playerNum==2){
    $('.main-container').html(v_play_html2);}else{$('.main-container').html(v_play_html1);};
     $(".out-container").css("padding-top","10px");
    $(".out-container").css("padding-bottom","70px");
    v_board=[[1,1,1],[1,1,1],[1,1,1]];
  };
  
   //function:resetAll()
  function resetAll(){
    $('.main-container').html(v_init_html);
    v_board=[[1,1,1],[1,1,1],[1,1,1]];
    playerNum=0;
  };
  
   //function:isEnd()
  function isEnd(){
    for(var m=0;m<3;m++){
      for(var n=0;n<3;n++){
        if(v_board[m][n]==1){return;}
        var tmp3=0;
      }
    }
    alert("It's a draw game!")
    clearAll();
  };
  
  var v_boxNum=["one","two","three","four","five","six","seven","eight","nine"];
  
  //  function:  chooseToe  by  computer
  function chooseToe(){
    
    var ran=Math.floor((Math.random()*9));
    
    var ranNum=v_boxNum[ran];
    var v_tmp=$("#"+ranNum).attr("value");
    var i=v_tmp.substr(0,1);
    var j=v_tmp.substr(1,1);
    
    while(v_board[i][j]!=1){
      ran=Math.floor((Math.random()*9));
      ranNum=v_boxNum[ran];
      v_tmp=$("#"+ranNum).attr("value");
      i=v_tmp.substr(0,1);
      j=v_tmp.substr(1,1);
    }
    $("#"+ranNum).text(curPlayerIcon);
     v_board[i][j]=v_curVal;
    // alert(curPlayer);
     isWin(i,j);
      isEnd();
    switchTurn(); 
    
    //  
    
  };
  
});