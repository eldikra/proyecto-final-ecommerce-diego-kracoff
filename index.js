/*
Modo debugging: Agregar variable de entorno DEBUG=true al ejecutar el servidor
*/
import express from 'express';
import { router } from './src/routes/routes.js';
import { isValidEmail, logRequest } from './util.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectToDatabase } from './database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './src/routes/products.js';
import { verifyToken } from './src/middlewares/auth.middleware.js';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
app.use((req, res, next) => {
  if (process.env.MANTENIMIENTO?.toLowerCase() === 'true') { // Verifica si la API está en mantenimiento
    return res.status(503).json({ message: 'API en mantenimiento', });
  } else { next(); } // Si no está en mantenimiento, continúa con la siguiente función middleware
});

connectToDatabase(); //Se conecta a la base de datos

app.use(cors()); // Habilita CORS para todas las rutas para la configuración especificada
app.use(express.json()); // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use((req, res, next) => { //Guarda en el log la URL de la petición 
  logRequest(req, res, next); // Registra la solicitud
  next(); // Continúa con la siguiente función middleware
});

app.use('/api', router);
app.use('/api/products',productosRoutes); // Rutas de productos


// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

app.listen(process.env.PORT, () => {
  logRequest({ method: 'Server Start', url: `http://localhost:${process.env.PORT}` }, null); // Log de inicio del servidor
});
