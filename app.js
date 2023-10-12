// {
var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3').verbose();

var app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended: true}));

var db = new sqlite3.Database(':memory:');
db.serialize(function() {
  db.run("CREATE TABLE user (username TEXT, password TEXT, name TEXT)");
  db.run("INSERT INTO user VALUES ('Abiyyu', 'Abiyyu', 'Abiyyu')");
});
// }
app.post('/login', function (req, res) {
    var username = req.body.username; 
    var password = req.body.password; 
    var query = "SELECT name FROM user where username = ? and password = ?";
    

    console.log("username: " + username);
    console.log("password: " + password);
    console.log('query: ' + query);
    
    db.get(query, [username, password], function (err, row) {

        if(err) {
            console.log('ERROR', err);
            res.redirect("/index.html#error");
        } else if (!row) {
            res.redirect("/index.html#unauthorized");
        } else {
            res.send(`
            <!DOCTYPE html>
                <html>
                <head>
                    <style type="text/css">
                        body {
                            background-color: #ccc;
                            font-family: Arial, sans-serif;
                        }
                        .container {
                            text-align: center;
                            background-color: #fff;
                            border-radius: 10px;
                            padding: 20px;
                            width: 300px;
                            margin: 0 auto;
                        }
                        h1 {
                            color: #0074D9; /* Ganti dengan warna yang Anda suka */
                        }
                        img {
                            width: 200px;
                            height: 150px;
                        }
                        p {
                            color: #333;
                        }
                        a {
                            display: block;
                            text-align: center;
                            margin-top: 10px;
                            text-decoration: none;
                            color: #0074D9; /* Ganti dengan warna yang Anda suka */
                        }
                        a:hover {
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h1>Hello <b>${row.name}</b></h1>
                        <img src="/success.png" alt="Success">
                        <p>Selamat Kamu Berhasil Login & Mendapatkan Resep Rahasia Krabby Patty</p>
                        <a href="/index.html">Go back to login</a>
                    </div>
                </body>
                </html>

`           );


        }
    });

});

app.listen(3000);

