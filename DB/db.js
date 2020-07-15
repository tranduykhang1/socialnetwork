const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'db4free.net',
    port: '3306',
    user: 'duykhang',
    password: 'duykhang010',
    database: 'do_an1700215'
})


conn.connect();
module.exports = conn;
