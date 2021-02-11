const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);

const website = args[0];
const dir = args[1];

request(website, (error, response, body) => {
  if (error) throw error;
  fs.writeFile(dir, body, (err) => {
    if (err) throw err;
    console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${dir}`);
  });

});