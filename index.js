/* Pendientes
Agregar dentro de utils la parte de logs
*/
import express from 'express';
import { router } from './src/routes/routes.js';
import { isValidEmail, logRequest } from './util.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectToDatabase } from './database.js';
import cors from 'cors';
import dotenv from 'dotenv';
import notfound from './src/middlewares/not-found.js';
import productosRoutes from './src/routes/products.js';
import { verifyToken } from './src/middlewares/auth.middleware.js';

dotenv.config();
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const corsOptions = { // Configuracion de CORS 
  origin: ['https://127.0.0.1:3001'],//Dominios permitidos
  // Métodos HTTP permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // Encabezados permitidos
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permitir cookies o credenciales
};

app.use((req, res, next) => {
  if (process.env.MANTENIMIENTO?.toLowerCase() === 'true') { // Verifica si la API está en mantenimiento
    return res.status(503).json({ message: 'API en mantenimiento', });
  } else { next(); } // Si no está en mantenimiento, continúa con la siguiente función middleware
});
connectToDatabase(); //Se conecta a la base de datos

app.use(cors(corsOptions)); // Habilita CORS para todas las rutas para la configuración especificada
app.use(express.json());

app.use((req, res, next) => { //Guarda en el log la URL de la petición 
  logRequest(req, res, next); // Registra la solicitud
  next(); // Continúa con la siguiente función middleware
});


app.use(express.static(__dirname + '/public')); // Sirve archivos estáticos desde el directorio 'public'
app.use('/api', router);
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/api/products', productosRoutes); // Rutas de productos
app.use(notfound); // Middleware para manejar rutas no encontradas

app.listen(process.env.PORT, () => {
  logRequest({ method: 'Server Start', url: `http://localhost:${process.env.PORT}` }, null, () => {
    console.log('Servidor iniciado y log registrado.');
  }); // Log de inicio del servidor

});
