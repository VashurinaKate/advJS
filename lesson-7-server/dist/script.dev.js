"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var fs = require('fs');

var cors = require('cors');

var app = express();
app.use(bodyParser.json({
  extended: true
}));
app.use(express["static"]('.'));
app.use(cors());
app.listen(3000, function () {
  console.log('server is running at port 3000!');
});
app.get('/cartData', function (req, res) {
  fs.readFile('cart.json', 'utf-8', function (err, data) {
    res.send(data);
  });
});
app.get('/catalogData', function (req, res) {
  fs.readFile('catalogData.json', 'utf-8', function (err, data) {
    res.send(data);
  });
});
app.post('/addToCart', function (req, res) {
  fs.readFile('cart.json', 'utf-8', function (err, data) {
    if (err) {
      res.send('{"result": 0}');
    } else {
      var cart = JSON.parse(data);
      var item = req.body;
      var index = cart.findIndex(function (el) {
        return el.id_product === item.id_product;
      });

      if (index === -1) {
        cart.push(item);
      }

      fs.writeFile('cart.json', JSON.stringify(cart), function (err) {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});
app["delete"]('/removeFromCart', function (req, res) {
  fs.readFile('cart.json', 'utf-8', function (err, data) {
    if (err) {
      res.send('{"result": 0}');
    } else {
      var cart = JSON.parse(data);
      var item = req.body;
      var index = cart.findIndex(function (el) {
        return el.id_product === item.id_product;
      });
      cart.splice(index, 1); // В данном случае при удалении товара из корзины постоянно происходить перезапись товаров?
      // Влияет ли это на скорость работы приложения? И как от этого можно избавиться?

      fs.writeFile('cart.json', JSON.stringify(cart), function (err) {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});
app.get('/clientStats', function (req, res) {
  fs.readFile('stats.json', 'utf-8', function (err, data) {
    res.send(data);
  });
});
app.post('/addStats', function (req, res) {
  fs.readFile('stats.json', 'utf-8', function (err, data) {
    if (err) {
      res.send('{"result": 0}');
    } else {
      var stat = JSON.parse(data);
      var item = req.body;
      stat.push(item);
      fs.writeFile('stats.json', JSON.stringify(stat), function (err) {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      });
    }
  });
});