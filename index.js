/*
PENDIENTES:

Modo debugging: Agregar variable de entorno DEBUG=true al ejecutar el servidor
Agregar validacion del tipo de dato de los campos del body de las peticiones
Agregar validación de email en el body de las peticiones
Middleware para manejar not authorized errors

*/
import express from 'express';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './src/routes/routes.js';
import { logInfo, logRequest } from './util.js';
import productosRoutes from './src/routes/products.js';
import authRoutes from './src/routes/auth.js';
import bodyParser from 'body-parser';
import { authentication } from './src/middlewares/auth.middleware.js';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();


app.use((req, res, next) => {
  if (process.env.MANTENIMIENTO?.toLowerCase() === 'true') { // Verifica si la API está en mantenimiento
    return res.status(503).json({ message: 'API en mantenimiento', });
  } else { next(); } // Si no está en mantenimiento, continúa con la siguiente función middleware
});

if (process.env.DEBUG?.toLowerCase() === 'true') { // Verifica si el modo debug está activado
  const mensaje = process.env.DEBUG_MESSAGE || "Debug ON"; // Mensaje de debug, puede ser personalizado
  logInfo(mensaje); // Imprime en consola el método y la URL de la petición
}else {
  const mensaje = process.env.DEBUG_MESSAGE || "Debug OFF"; // Mensaje de debug, puede ser personalizado
  logInfo(mensaje);
}

app.use(cors()); // Habilita CORS para todas las rutas para la configuración especificada
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(bodyParser.json());
app.use((req, res, next) => { //Guarda en el log la URL de la petición 
  logRequest(req, res, next); // Registra la solicitud
  next(); // Continúa con la siguiente función middleware
});
app.use('/', (req, res) => { // Ruta raíz para la API
  res.json({ message: 'Bienvenido a la API 2025' });
});
app.use('/api', router);// Rutas de la API principal con informacion general
app.use('/auth', authRoutes); // Rutas de autenticación

app.use(authentication);// Middleware de autenticación para todas las rutas
app.use('/api/products', authentication, productosRoutes); // Rutas de productos


// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(process.env.PORT || 3000, () => {
  logRequest({ method: 'Server Start', url: `http://localhost:${process.env.PORT || 3000}` }, null); // Log de inicio del servidor
});
