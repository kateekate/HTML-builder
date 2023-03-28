const fs = require('fs');
const { stdin, stdout } = process;

const output = fs.createWriteStream('./02-write-file/text.txt', 'utf-8');

stdout.write('Add message\n');

stdin.on('data', data => {
  if (data.toString('utf-8').trim() === 'exit') {
    console.log('\nBye');
    process.exit();
  } else {
    output.write(data);
  }
});

process.on('SIGINT', () => {
  console.log('\nBye');
  process.exit();
});