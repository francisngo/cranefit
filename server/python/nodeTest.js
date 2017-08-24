// Spawn a child-process executing Python
const { spawn } = require('child_process');
const py = spawn('python',  ['py_test.py']);

// Get some dates
const dates = new Array(14);
const today = Date.now();
let i = 14;
while (i--) {
  dates[i] = `2017-01-${1 + i}`
}

// Use streams interface to send data to Pytohn process
let dataString = '';
let errorString = '';
py.stdout.on('data', data => dataString += data);
py.stdout.on('end', () => console.log(dataString));
py.stderr.on('data', data => errorString += data);
py.stderr.on('end', () => console.log(errorString))
py.stdin.write(JSON.stringify([dates, [4,5,7,2,4,3,8,4,5,7,2,4,3,8]]));
py.stdin.end();
