$(document).ready(function(){
  var following =[];
  var url= "https://api.twitch.tv/kraken/streams/freecodecamp?client_id=w6wha3ky60d8vnjo1dhhiqffwfwa0g";

  $.ajax({
    url: url,
    success: function(data1){
      if(data1.stream === null){
        $('#fccStatus').html("Free Code Camp is Currently offline");
      }else {
        $('#fccStatus').html("Free Code Camp is Currently Online");
      }
    }
  });

  var followerUrl = "https://api.twitch.tv/kraken/users/freecodecamp/follows/channels?client_id=w6wha3ky60d8vnjo1dhhiqffwfwa0g";
  $.ajax({
    url: followerUrl,
    success: function(data2){
      for (var i=0; i <data2.follows.length; i++) {
        var displayName = data2.follows[i].channel.display_name;
        following.push(displayName);
      }
      following.push("OgamingSC2");
      following.push('cretetion');
      following.push('freecodecamp');
      following.push('storbeck');
      following.push('habathcx');
      following.push('RobotCaleb');
      following.push('noobs2ninjas');
      following.push('ESL_SC2');

      for (var i=0; i< following.length; i++){
        var url2 ="https://api.twitch.tv/kraken/streams/"+following[i]+"?client_id=w6wha3ky60d8vnjo1dhhiqffwfwa0g";
        $.getJSON(url2).done(function(data3){
          var logo;
          var status;
          var name;
          if(data3.stream === null){
            logo = "https://thumbs.dreamstime.com/z/prohibited-no-stop-sign-16681137.jpg";
            name = displayName;
            status = "Not available";
          }
        });
      }
      for (var i = 0; i <following.length; i++){
        var onlineURL = "https://api.twitch.tv/kraken/streams/"+following[i]+"?client_id=w6wha3ky60d8vnjo1dhhiqffwfwa0g";
        $.getJSON(onlineURL, function(data4){
            var logo = data4.stream.channel.logo;
            var status = data4.stream.channel.status;
            var name = data4.stream.channel.display_name;
            $('#followerInfo').prepend("<div class='row'>" + "<div class='col-md-4'>" + "<img src='" + logo + "'>" + "</div>" + "<div class='col-md-4'>" + name + "</div>" + "<div class='col-md-4'>" + status + "</div> </div>");
        });
      }

    }
  });
});