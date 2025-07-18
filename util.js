import fs from 'fs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { Console } from 'console';

const JWT_SECRET = process.env.JWT_SECRET
function isValidEmail(email) {
  // Validacion de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function logInfo(message) {
  const infoLog = [];
  infoLog.push('\n', '--- Info Log ---');//Marca el inicio del log de información
  infoLog.push(`Info Message: ${message || 'No info message provided'}`);//Guarda en un log el mensaje de información
  infoLog.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición
  fs.appendFile('request.log', infoLog.join('\n'), (err) => {
    if (err) throw err;
    logError(`Error al guardar en el log de informacion`, err);
  });
}

function logRequest(req) {
  const datos = [];
  datos.push('\n', '--- Request Log ---');//Marca el inicio del log de la petición
  datos.push(`Request URL: ${req.url}`);//Guarda en un log la URL de la petición
  datos.push(`Request Method: ${req.method}`);//Guarda en un log el método de la petición
  datos.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición
  datos.push(`Client IP: ${req.ip}`);//Guarda en un log la IP del cliente
  fs.appendFile('request.log', datos.join('\n'), (err) => {
    if (err) throw err;
    logError(`Error al guardar en el log de peticiones`, err);
  });
}

function logError(err, req) {
  const errorLog = [];
  errorLog.push('\n', '--- Error Log ---');//Marca el inicio del log de errores
  errorLog.push(`Error URL: ${err.url || 'No URL provided'}`);//Guarda en un log la URL de la petición que causó el error
  errorLog.push(`Error Message: ${err.message || 'No error message provided'}`);//Guarda en un log el mensaje de error
  errorLog.push(`Request Method: ${err.method || 'no method'}`);//Guarda en un log el método de la petición que causó el error
  errorLog.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición que causó el error
  fs.appendFile('request.log', errorLog.join('\n'), (err) => {
    if (err) throw err;
    logInfo(`Error al guardar en el log de errores`, err);
  });
}

function tokenGenerator(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '3h' });
  if (!token) {
    logError("Token generation failed");
    return null; // Return null if token generation fails
  }
  return token;
}

export { isValidEmail, logRequest, logError, logInfo, tokenGenerator };
