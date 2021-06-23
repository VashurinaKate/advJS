const fs = require('fs');

fs.readFile('./data.json', 'utf-8', (err, data) => {
    if (!err) {
        const obj = JSON.parse(data);
        console.log(obj);
    }
})
