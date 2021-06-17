const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
var cors = require('cors');

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(express.static('.'));
app.use(cors());

app.listen(3000, () => {
    console.log('server is running at port 3000!');
})

app.get('/cartData', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        res.send(data);
    });
})

app.get('/catalogData', (req, res) => {
    fs.readFile('catalogData.json', 'utf-8', (err, data) => {
        res.send(data);
    })
})

app.post('/addToCart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            const index = cart.findIndex(el => el.id_product === item.id_product);
            if (index === -1) { cart.push(item) }

            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
})

app.delete('/removeFromCart', (req, res) => {
    fs.readFile('cart.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const cart = JSON.parse(data);
            const item = req.body;

            const index = cart.findIndex(el => el.id_product === item.id_product);
            cart.splice(index, 1);

            // В данном случае при удалении товара из корзины постоянно происходить перезапись товаров?
            // Влияет ли это на скорость работы приложения? И как от этого можно избавиться?
            fs.writeFile('cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
})

app.get('/clientStats', (req, res) => {
    fs.readFile('stats.json', 'utf-8', (err, data) => {
        res.send(data);
    })
})

app.post('/addStats', (req, res) => {
    fs.readFile('stats.json', 'utf-8', (err, data) => {
        if (err) {
            res.send('{"result": 0}');
        } else {
            const stat = JSON.parse(data);
            const item = req.body;

            stat.push(item);

            fs.writeFile('stats.json', JSON.stringify(stat), (err) => {
                if (err) {
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            })
        }
    })
})
