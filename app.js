var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //  middleware untuk menguraikan data JSON

// Konfigurasi koneksi MySQL
var db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // username MySQL
  password: '', // password MySQL
  database: 'bruteforce_db' // nama database
});

// Terhubung ke MySQL
db.connect(function (err) {
  if (err) {
    console.error('Koneksi ke MySQL gagal: ' + err.stack);
    return;
  }
  console.log('Terhubung ke MySQL dengan id ' + db.threadId);

  // // Masukkan data pengguna ke dalam tabel database
  // var insertQuery = "INSERT INTO ksj (username, password) VALUES (?, ?)";
  // var values = ['Abiyyu', 'Abiyyu'];

  // db.query(insertQuery, values, function (err, result) {
  //   if (err) {
  //     console.error('Gagal memasukkan data pengguna: ' + err);
  //     return;
  //   }
  //   console.log('Data pengguna berhasil dimasukkan');
  // });
});

app.post('/login', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  // Buat query SQL yang memeriksa data pengguna yang sesuai
  var query = "SELECT * FROM ksj WHERE username = ? AND password = ?";
  
  // Jalankan kueri MySQL
  db.query(query, [username, password], function (err, rows) {
      if (err) {
          console.log('Kesalahan MySQL:', err);
          res.status(500).json({ success: false, message: "Kesalahan server" });
      } else if (rows.length === 0) {
          res.status(401).json({ success: false, message: "Login gagal" });
          console.log("Username yang dimasukkan:", username);
          console.log("Password yang dimasukkan:", password);

      } else {
          res.status(200).json({ success: true, message: "Login berhasil" });
      }
  });
});

app.listen(3000, function () {
  console.log('Server berjalan pada port 3000');
});
