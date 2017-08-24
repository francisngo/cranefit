// Spawn a child-process executing Python
const { spawn } = require('child_process');
const py = spawn('python',  ['py_test.py']);

// Get some dates
const dates = new Array(7);
const today = Date.now();
let i = 7;
while (i--) {
  dates[i] = today - 86400000 * i;
}

// Use streams interface to send data to Pytohn process
let dataString = '';
py.stdout.on('data', data => dataString += data);
py.stdout.on('end', () => console.log(dataString));
py.stderr.on('data', console.log);
py.stdin.write(JSON.stringify([dates, [3,3,3,3,3,3,3]]));
py.stdin.end();
