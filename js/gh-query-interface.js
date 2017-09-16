var Search = require("./../js/gh-query.js").searchModule;

$(document).ready(function(){
  $("#request").submit(function(event){
    event.preventDefault();
    var userName = $("#userName").val();
    $("#userName").val("");
  });
});
