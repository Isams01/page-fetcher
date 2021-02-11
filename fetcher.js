const request = require('request');
const fs = require('fs');
const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const args = process.argv.slice(2);

const website = args[0];
const dir = args[1];
request(website, (error, response, body) => {
  if (error) throw error;
  fs.access(dir,fs.constants.F_OK, (err) => {
    if (err) {
      fs.writeFile(dir, body, (err) => {
        if (err) throw err;
        console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${dir}`);
      });
    } else {
      rl.question('The file already exists would you like to overwrite y/n?', (answer) => {
        if (answer === 'y') {
          fs.writeFile(dir, body, (err) => {
            if (err) throw err;
            console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${dir}`);
          });
        } else {
          console.log('Try a different directory then');
        }
        rl.close();
      });
    }
  });
  rl.close();
});
