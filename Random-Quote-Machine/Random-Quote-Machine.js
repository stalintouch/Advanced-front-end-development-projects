
$(document).ready(function(){
  var $quotemain = $('#quote-main');
  var $author = $('#quote-author');
  var $quote = $('#quote');
  quote();
  $('#quote').on('click', function(){
    quote();
    
    
  });
  
  function quote(){
    $.ajax({
      headers: {
        "X-Mashape-Key": "5WSszT6kehmshlWpiR05wx8ec7Njp1HAq2jjsn8z7IEn6D7OtS",
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      url: 'https://andruxnet-random-famous-quotes.p.mashape.com/',
      success: function(data){
        data = JSON.parse(data);
        changingColors(data);
        $('.twitter-share-button').attr('href', "https://twitter.com/intent/tweet?text=" + data.quote);
      }
    });
  }
  function changingColors(filteredData) {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    var randomColorHeader = Math.floor(Math.random()*16777215).toString(16);
    $quotemain.animate({'opacity': 0}, 1000, function () {
      $(this).text(filteredData.quote);
    }).animate({'opacity': 1}, 1000).css({transition: 'color 2s ease-in-out', 'color': "#" + randomColor});

    $author.animate({'opacity': 0}, 1000, function () {
      $(this).text(filteredData.author);
    }).animate({'opacity': 1}, 1000).css({transition: 'color 2s ease-in-out', 'color': "#" + randomColor});

    $quote.css({transition: 'background-color 2s ease-in-out', 'background-color': "#" + randomColor});
    $('.fa').css({transition: 'color 2s ease-in-out', 'color': "#" + randomColor});
    $('body').css({transition: 'background-color 2s ease-in-out', 'background-color': "#" + randomColor});
    $('.navbar-default').css({transition: 'background-color 2s ease-in-out', 'background-color': "#" + randomColorHeader});
  }
});