# api.tienda
# API Tienda

API REST desarrollada con Node.js, Express y MongoDB para la gestión de tiendas, productos y ventas.

## Requisitos
- Node.js v18 o superior
- npm
- MongoDB (local o Atlas)
- Git

## Instalación
Clona el repositorio, entra al proyecto e instala dependencias:
git clone https://github.com/Anto-Morales/api.tienda.git
cd api.tienda
npm install

## Variables de entorno
Crea un archivo .env en la raíz del proyecto con el siguiente contenido:
PORT=3000
MONGO_URI=mongodb://localhost:27017/tienda
JWT_SECRET=tu_clave_secreta

## Ejecutar el proyecto
Para desarrollo:
npm run dev

Para producción:
npm start

El servidor se ejecuta en:
http://localhost:3000

## Notas importantes
- Los totales de las ventas se calculan automáticamente.
- quantity representa el número de piezas vendidas.
- El precio unitario se toma desde el producto (amount).
- Se valida el stock antes de crear o actualizar una venta.
- No subir node_modules ni el archivo .env al repositorio.
- Las pruebas pueden realizarse con Postman, Insomnia o Swagger.

## Autor
Antonio Arellano
