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
where node >NUL 2>&1
if %errorlevel% neq 0 (
    echo Node.js is required but was not found in your PATH.
    pause
    exit /b 1
)
where npm >NUL 2>&1
if %errorlevel% neq 0 (
    echo npm is required but was not found in your PATH.
    pause
    exit /b 1
)

echo Running unit tests...
npm test
pause
endlocal
