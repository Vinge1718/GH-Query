function Search(){

}

Search.prototype.query = function (userName) {
  var apiKey = require("./../.env").apiKey;
  $.get("https://api.github.com/users/" + userName + "?access_token=" + apiKey).then(function(response){
    $("#avatar").append("<img src="+ response.avatar_url +" height=\"200\">");
    $("#about").append("<p>Results: </p><br>"+response.login+"<ul><li>Number of Repositories: "+response.public_repos+
    "</li><li>Users following this account: "+response.followers+"</li><li>Accounts followed by this User: "+response.following+"</li></ul>")
    $.get("https://api.github.com/users/" +userName+"/repos?access_token="+apiKey).then(function(response){
      for(var i = 0; i < response.length; i++){
      $("#repos").append("<h4> Repository name: "+response[i].name+ "</h4>"+ "<ul><li>Dominant Languages Implemented: "+response[i].language+"</li><li>The project is located at: "+response[i].html_url+"</li></ul>");
    }
    });
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.searchModule = Search;
