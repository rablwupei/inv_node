echo off
set root=%~dp0
cd %root%/inv_node
call %root%/nodejs/node.exe app.js
pause