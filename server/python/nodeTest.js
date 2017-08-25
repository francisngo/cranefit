const today = new require('moment')();

// Spawn a child-process executing Python
const { spawn } = require('child_process');
const py = spawn('python',  ['py_test.py']);

// Get some dates
let i = 30;
const dates = new Array(i);
const nums = new Array(i);
while (i--) {
  dates[i] = today.subtract(i, 'days').format('YYYY-MM-DD');
  nums[i] = Math.random() * 30;
}

// Use streams interface to send data to Pytohn process
let dataString = '';
let errorString = '';
py.stdout.on('data', data => dataString += data);
py.stdout.on('end', () => console.log(errorString ? errorString : JSON.parse(dataString.match(/\[.+\]/)[0])));
py.stderr.on('data', data => errorString += data);
py.stdin.write(JSON.stringify([dates, nums]));
py.stdin.end();
