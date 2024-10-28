@echo off
REM Crear la carpeta "public" en la ruta especificada
mkdir "D:\User\Fordread\Downloads\proyecto react\dist\public"

REM Mover archivos a la carpeta "public"
move "D:\User\Fordread\Downloads\proyecto react\dist\panol-abm" "D:\User\Fordread\Downloads\proyecto react\dist\public"
move "D:\User\Fordread\Downloads\proyecto react\dist\menu.json" "D:\User\Fordread\Downloads\proyecto react\dist\public"

REM Copiar solo el contenido de "dist" a la ruta en XAMPP
xcopy "D:\User\Fordread\Downloads\proyecto react\dist\*" "C:\xampp\htdocs" /E /H /C /I

@echo Todo el proceso ha sido completado con éxito.
pause
