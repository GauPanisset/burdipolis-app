'use strict';
const Express = require('express');
const BP = require('body-parser');
const http = require("http");

const PORT = process.env.PORT || 8080

const app = Express();

app.use(BP.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.append('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');

    next();
});

app.use('/products', require('./routes/products').router);
app.use('/user', require('./routes/users').router);
app.use('/send', require('./routes/contact').router);

app.listen(PORT, (err) => {

    if (err) {
        console.log(err);
    }
    else {
        console.log('app listening on port ' + PORT);
    }
});

