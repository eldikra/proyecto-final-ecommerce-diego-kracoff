/* Pendientes
Agregar dentro de utils la parte de logs
*/

import express from 'express';
import { router } from './src/routes/routes.js';
import {PORT} from './config.js';
import { isValidEmail } from './util.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectToDatabase } from './database.js';
import { request } from 'node:http';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const products = request('./src/routes/products.js');
//Se conecta a la base de datos
connectToDatabase();


app.use(express.json());
app.use((req, res, next) => { //Guarda en el log la URL de la petición 
  console.log(`Request URL: ${req.url}`);
  next();
});

app.use('/api', router);
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
app.use('/api/products', products);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
