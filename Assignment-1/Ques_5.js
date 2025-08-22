const fs = require('fs');
const filePath = 'output.txt';

const writeStream = fs.createWriteStream(filePath, { flags: 'w' });

writeStream.write('Hello, Node.js!', (err) => {
  if (err) {
    console.error('Error writing to file:', err.message);
  }
});

writeStream.end();

writeStream.on('finish', () => {
  console.log('Data written successfully to output.txt');
});

writeStream.on('error', (err) => {
  console.error('Stream error:', err.message);
  });