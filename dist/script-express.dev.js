"use strict";

var express = require('express');

var app = express();
app.use(express["static"]('.'));
app.listen(3000, function () {
  console.log('server is running at port 3000!');
});
app.get('/data', function (req, res) {
  res.send('data');
});