(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = " 34cfc9d48da65604e093151f2fa05fcb93e59a3b";

},{}],2:[function(require,module,exports){
var Search = require("./../js/gh-query.js").searchModule;

$(document).ready(function(){
  $("#request").submit(function(event){
    event.preventDefault();
    var userName = $("#userName").val();
    $("#userName").val("");
  });
});

},{"./../js/gh-query.js":3}],3:[function(require,module,exports){
var apiKey = require("./../.env").apiKey;

function Search(){

}

Search.prototype.query = function (userName, displayFunction) {
  $.get("http://api.github.com/users/" + "userName" + "?access_token=" + apiKey).then(function(response){
    console.log(response);
  }).fail(function(error){
    console.log(error.responseJSON.message);
  });
};

exports.searchModule = Search;

},{"./../.env":1}]},{},[2]);
