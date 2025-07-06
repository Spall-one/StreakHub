#!/usr/bin/env node
const { spawn } = require('child_process');
const waitOn = require('wait-on');
const open = require('open');

const backend = spawn('npm', ['run', 'develop'], {
  cwd: 'backend',
  stdio: 'inherit',
  shell: true,
});

const frontend = spawn('npm', ['run', 'dev'], {
  cwd: 'frontend',
  stdio: 'inherit',
  shell: true,
});

waitOn({ resources: ['http://localhost:3000', 'http://localhost:1337/admin'] })
  .then(() => {
    open('http://localhost:3000');
    open('http://localhost:1337/admin');
  })
  .catch((err) => {
    console.error('Error waiting for servers to start', err);
  });

function cleanup() {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
}

process.on('SIGINT', () => {
  cleanup();
  process.exit();
});
process.on('exit', cleanup);
