# APP BOLETOS FIFA MEXICO

PROGRAMA PARA CHECAR SI HAY BOLETOS PARA MEXICO QATAR 2022

## Como correrlo?

> Instalar NodeJS: https://nodejs.org/en/.
> Instalar Visual Studio Code. https://code.visualstudio.com/

-   Abrir el proyecto axios_fifa en VS Code
-   Abrir una Terminal en VS Code
-   Correr el comando: 'npm --version' y verificar que de un resultado
-   Correr el comando: 'npm install' para instalar algunas librerias necesarias
-   Correr el comando: 'npm install -g typescript' para instalar typescript global.
-   Correr el comando: 'cd src/api-tests/fifa-tests' para ir a la carpeta de fifa-tests
-   Correr el comando: 'tsc fifa-tickets-mexico.ts' para compilar el codigo typescript y convertir el archivo JS.

Si quieres revisar constantemente que haya boletos durante el dia, puedes correr lo siguiente:
MACBOOK PRO: Correra el programa cada 30 segundos, y checa si hay boletos todo el dia, hasta llegar a correrlo 1500 veces, puedes modificar el numero de vecs que quieras que corra, solo cambiar el numero
-   for i in {1..1500}; do node fifa-tickets-mexico.js && sleep 30; done

WINDOWS
-   for ($i=0; $i - lt 1000; $i++){ node fifa-tickets-mexico.js; Start-Sleep -Seconds 30}

