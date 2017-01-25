"use strict";

$.ajax({
 type: 'get',
 url: 'http://localhost:3000/todos',
 success: function (data) {
 console.log("отримали даны выд сервера GET");
 console.log(data);
 countries = data;
 }
 });
