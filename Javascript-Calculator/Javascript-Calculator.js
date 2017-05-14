$(".btn").on('click', function(){
  var id = $(this).attr('id')
  
  for(keys in matchInput) {
   if (keys == id) {
     if(id === 'C') {
       total = 0;
       holder = [];
     } else {
       operator = id
     }
   }
 }
 
  var trueNum = checkNum(id)

  if (typeof trueNum === 'number') {
    $('#result').text(id)
    if (holder.length === 0) {
      holder.push(trueNum)
      console.log('primero', holder)
      
   } else if(holder.length === 1 && operator == undefined) {
     holder.push(trueNum);
     holder = holder.join('').split(' ')
     holder[0] = parseInt(holder[0])
     console.log('segundo', holder)
     
    } else if (holder.length ===1 && operator != undefined ) {
      console.log('tercero')
      holder.push(trueNum)
    }
  }
  
  if(id === '=') {
    math(operator, holder)
    console.log(total)
    holder = [];
    holder.push(total)
  }
  $('#result').text(total)
})

var holder = [];
var operator;
var total;
var matchInput ={
 '/': function(a,b){
   return a / b;
 },
  '*': function(a,b){
    return a * b;
  },
  '+': function(a,b){
    return a + b; 
  },
  '-': function(a,b){
    return a - b;
  },
  'C': function(){
        
   },
}

function math(operator, arr){
  total = arr.reduce(matchInput[operator])
  return total;
}


function checkNum(id) {
  var num = parseFloat(id)
  if (Number.isInteger(num)) {
    return num
  } else {
    return false;
  }
}
