@echo off
setlocal
cd /d %~dp0
if not exist node_modules (
    echo Installing root dependencies...
    npm install --legacy-peer-deps
)
if not exist frontend\node_modules (
    echo Installing frontend dependencies...
    npm install --prefix frontend --legacy-peer-deps
)
if not exist backend\node_modules (
    echo Installing backend dependencies...
    npm install --prefix backend --legacy-peer-deps
)
call npm run dev
endlocal
