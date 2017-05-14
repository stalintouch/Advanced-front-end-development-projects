var totalSession = '#total-session';
var totalBreak = '#total-break';
var totalLength = 25;
var breakLength = 5;
var timer;
var hasBeenClicked = false
var clock;
var timerClock;
var internalLength;

$(document).ready(function(){
  $('button').on('click', function(){
    countDown(totalLength)
        
  });
  
  
  $('span').on('click', function(e){
    if (!hasBeenClicked) {
      if(e.target.id == 'break-plus'){
      increase(totalBreak, "+")
      
      } else if(e.target.id == 'break-minus') {
      increase(totalBreak, '-')
     
      } else if(e.target.id == 'session-plus') {
      increase(totalSession, '+')
    
      } else if(e.target.id == 'session-minus') {
      increase(totalSession, '-')
      }
    }
  }); 
});



function increase(id, op){
  idValue = $(id).text()
  idValue = parseInt(idValue)
   
  if(id == totalSession && totalLength >= 1) { 
    totalLength =  operations[op](idValue, 1)
    $(id).html(totalLength)
    $('#time').html(totalLength) 
    internalLength = totalLength
  }
  if(id == totalBreak && breakLength >= 1 ){
    breakLength = operations[op](idValue, 1)
    $(id).html(breakLength)
    internalLength = breakLength
  }
}    
 
var operations = { 
  '+': function(a, b) { 
    return a + b; 
  },
  '-': function(a, b){
    return a - b;
  },
  '*': function(a, b) {
    return a * b;
  },
  '/': function(a, b){
    return a / b;
  }
}

function convertToTime(num){
  var hrs  = Math.floor(num/3600);
  var mins = Math.floor((num % 3600)/60);
  var secs = num % 60;
  return (hrs > 0 ? hrs + ":" : "") + (mins < 10 ? "0" : "") + mins + ":" + (secs < 10 ? "0" : "") + secs;
};

function timeStringToFloat(time){
  var hoursMinutes = time.split(/[.:]/);
  var hours = parseInt(hoursMinutes[0], 10);
  var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
  return (hours + minutes /60).toFixed(2)
}

function countDown(length){
  internalLength = internalLength || length
  timer = Math.floor(internalLength * 60);
  
  
  if(!hasBeenClicked){
    clock = setInterval(function(){

      if (timer < 1 ) {
        if($('#break').hasClass('hidden')){
          $('#break').removeClass('hidden')
          $('#session').addClass('hidden')
          internalLength = undefined;
          clearInterval(clock)
          hasBeenClicked = false ;
          countDown(breakLength)
        } else if($('#session').hasClass('hidden')){
          internalLength = undefined;
          clearInterval(clock)
          hasBeenClicked = false;
          $('#session').removeClass('hidden')
          $('#break').addClass('hidden')
          countDown(totalLength)
        }
         
        
      } 

      timer -= 1
      $('#time').html(convertToTime(timer))
      hasBeenClicked = true;

    }, 1000);

  }else if (hasBeenClicked) {
    clearInterval(clock)
    hasBeenClicked = false ;
    timerClock =$('#time').text();
    internalLength = timeStringToFloat(timerClock)
  }  
}
