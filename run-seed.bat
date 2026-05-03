@echo off
echo ========================================
echo   تشغيل seed للمشروع
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Flushing DNS cache...
ipconfig /flushdns >nul 2>&1

echo [2/2] Running seed script...
npm run seed --prefix server

echo.
if %ERRORLEVEL% EQU 0 (
    echo ✓ Seed completed successfully!
    echo.
    echo Next steps:
    echo   1. Run: npm run dev:all
    echo   2. Open: http://localhost:5173/admin/login
    echo   3. Log in with the admin user from seed (see SEED_* in server/.env)
) else (
    echo ✗ Seed failed. Check the error above.
    echo.
    echo Common fixes:
    echo   1. Check MONGODB_URI in server/.env
    echo   2. Verify IP Access in MongoDB Atlas
    echo   3. Try getting new connection string from Atlas
)

echo.
pause
