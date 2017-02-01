"use strict";

// $.ajax({
//  type: 'get',
//  url: 'http://localhost:3000/todos',
//  success: function (data) {
//  console.log("отримали даны выд сервера GET");
//  console.log(data);
//  countries = data;
//  }
//  });

// $.ajax({
//   type: 'get',
//   crossDomain: true,
//   jsonpCallback: function() {
//     console.log(123);
//   },
//   url: 'https://www.opensecrets.org/api/?method=candSummary&cid=N00030612&cycle=2016&output=json&apikey=0ec32033261cbc6083d14d5a89fdbf38',
//   success: function(data) {
//     console.log(data);
//   }
// });

// $.getJSON( "https://www.opensecrets.org/api/?method=candSummary&cid=N00030612&cycle=2016&output=json&apikey=0ec32033261cbc6083d14d5a89fdbf38", function( data ) {
//  console.log(data);
// });

// var script = document.createElement('script');
// script.src = 'https://www.opensecrets.org/api/?method=candSummary&cid=N00030612&cycle=2016&output=json&apikey=0ec32033261cbc6083d14d5a89fdbf38';
// script.onload = function() {
//   console.log(arguments);
// };
//
// document.head.appendChild(script);