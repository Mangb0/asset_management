var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '1234',
    database: 'asset'
});


connection.connect(function(err) {
    if (err) console.error(err);
    console.log("Connected!");
});

module.exports = {
    async run(query, params) {
        return new Promise((resolve) => {
            connection.query(query, params, function(err, rows) {
                if (err) console.error(err);
                resolve(rows);
            });
        });
        
    }
}