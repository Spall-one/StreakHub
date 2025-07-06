#!/usr/bin/env node
const { spawn } = require('child_process');

function openBrowser(url) {
  const command = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  spawn(command, [url], { stdio: 'ignore', detached: true, shell: true });
}

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

setTimeout(() => {
  openBrowser('http://localhost:3000');
  openBrowser('http://localhost:1337/admin');
}, 5000);

function cleanup() {
  backend.kill('SIGINT');
  frontend.kill('SIGINT');
}

process.on('SIGINT', () => {
  cleanup();
  process.exit();
});
process.on('exit', cleanup);
