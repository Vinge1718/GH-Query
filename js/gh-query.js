var apiKey = require("./../.env").apiKey;

function Search(){

}

Search.prototype.query = function (userName) {
  $.get("http://api.github.com/users/" + userName + "?access_token=" + apiKey).then(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.searchModule = Search;
