// Spawn a child-process executing Python
const { spawn } = require('child_process');
const py = spawn('python',  ['py_test.py']);

// Use streams interface to send data to Pytohn process
let dataString = '';
py.stdout.on('data', data => dataString += data);
py.stdout.on('end', () => console.log(dataString));
py.stdin.write(JSON.stringify([1,2,3,4,5]));
py.stdin.end();