@echo off
setlocal
pushd "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0build-windows.ps1"
set "BUILD_EXIT_CODE=%ERRORLEVEL%"
popd

echo.
if not "%BUILD_EXIT_CODE%"=="0" (
    echo Build failed. Review the error above.
) else (
    echo Build succeeded. Check artifacts\windows for the output.
)

pause
exit /b %BUILD_EXIT_CODE%
