(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "34cfc9d48da65604e093151f2fa05fcb93e59a3b";

},{}],2:[function(require,module,exports){
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

},{"./../.env":1}],3:[function(require,module,exports){
var Search = require("./../js/gh-query.js").searchModule;

$(document).ready(function(){
  $("#request").submit(function(event){
    event.preventDefault();
    var newSearch = new Search();
    var userName = $("#userName").val();
    $("#userName, #avatar, #about, #repos").empty();
    newSearch.query(userName);
  });
});

$(document).ready(function(){
  $("#time").text(moment());
});

},{"./../js/gh-query.js":2}]},{},[3]);
