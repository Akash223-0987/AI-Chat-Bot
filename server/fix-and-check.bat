@echo off
echo ========================================
echo .env File Checker and Fixer
echo ========================================
echo.

cd /d "%~dp0"

echo Checking .env file...
echo.

node fix-env.js

echo.
echo ========================================
echo Verification complete!
echo ========================================
echo.
echo If API key is set correctly, you can now run:
echo   npm start
echo.
pause

