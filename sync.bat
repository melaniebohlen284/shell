@echo off
echo ============================================
echo   SINCRONIZACIÓN AUTOMÁTICA CON GITHUB
echo ============================================
echo.

REM Añadir todos los cambios
git add .

REM Pedir mensaje de commit
set /p mensaje="Ingresa el mensaje del commit: "

REM Hacer commit
git commit -m "%mensaje%"

REM Subir a GitHub
echo.
echo Subiendo cambios a GitHub...
git push

echo.
echo ============================================
echo   ¡Sincronización completada!
echo ============================================
echo.
pause
