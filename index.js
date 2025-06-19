import express from 'express';
import { router } from './src/routes/routes.js';
import {PORT} from './config.js';
import { isValidEmail } from './util.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { connectToDatabase } from './database.js';
connectToDatabase();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
