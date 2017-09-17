var Search = require("./../js/gh-query.js").searchModule;

$(document).ready(function(){
  $("#request").submit(function(event){
    event.preventDefault();
    var newSearch = new Search();
    var userName = $("#userName").val();
    $("#userName").val("");
    newSearch.query(userName);
  });
});
