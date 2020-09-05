var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Niket99#",
  database: "testuser"
});

con.connect(function(err) {
	if(err)
		console.log(err);
	else
		console.log('Connected to db')
});

module.exports = con