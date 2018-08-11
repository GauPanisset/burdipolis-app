const mysql = require('mysql');

const url = process.env.CLEARDB_DATABASE_URL;
//const url = "mysql://ba3391a19308bb:9ce93ab1@us-cdbr-iron-east-01.cleardb.net/heroku_40ec11c48a3c8e6?reconnect=true";
                                                //mysql://user:password@host/database
let config;

if (url !== undefined) {
    config = {
        user: url.substring(url.indexOf("/") + 2, url.indexOf(":", url.indexOf("/"))),
        password: url.substring(url.indexOf(":", url.indexOf("/")) + 1, url.indexOf("@")),
        host: url.substring(url.indexOf("@") + 1, url.indexOf("/", url.indexOf("@"))),
        database: url.substring(url.indexOf("/", url.indexOf("@")) + 1, url.indexOf("?"))
    };
    console.log(config);
} else {
	console.log("Can't find CLEARDB_DATABASE_URL")
}

let data;

function handleDisconnect() {
    data = mysql.createConnection(config);


    data.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            handleDisconnect();
        } else {
            console.log('connected');
            setInterval(function() {
                data.query('SELECT 1');
            }, 5000);
        }
    });

    data.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST' || err.fatal) {
            handleDisconnect();
        } else {
            throw err;
        }
    });
}

handleDisconnect();

module.exports = data;

