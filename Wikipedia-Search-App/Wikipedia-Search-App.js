$(document).ready(function(){
  var query;
  $('.search').one('click', function(){
    form = $("<form id='luis' onSubmit='return false;''></form>");
    $(this).empty().append(form);
    $(form).hide().append("<input type='text' autofocus='true' class='btn' id='input-search' name='submits'/>").fadeIn(500);

    $("#luis").keypress(function (e) {
      if(e.keyCode === 13) {
        $("#luis").submit(function(){
          query = $('#input-search').val();
          $.ajax({

            url: 'https://en.wikipedia.org/w/api.php?',
            data: { action: 'query', list: 'search', srsearch: query, format: 'json'},
            dataType: 'jsonp',
            success: function (data) {
              if (data.query.search.length !== 0) {
                $('#input-search').fadeOut(500);
                $('#atag').animate({top:50, color: 'white'}, 1000);
              }
              console.log(data);
              var url = 'https://en.wikipedia.org/wiki/';
              data.query.search.forEach(function(x){
                $('.results').hide().append("<a class='col-lg-12 well' id='results' target='_blank' href=" + url + x.title + ">" + "<strong>" + x.title + "</strong>" + '<br>' + x.snippet + "</a>").fadeIn(500);
              });
            }
          });
        });
      }

    });
  });

  

});