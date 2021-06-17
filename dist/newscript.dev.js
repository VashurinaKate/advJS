"use strict";

var fs = require('fs');

fs.readFile('./data.json', 'utf-8', function (err, data) {
  if (!err) {
    var obj = JSON.parse(data);
    console.log(obj);
  }
});