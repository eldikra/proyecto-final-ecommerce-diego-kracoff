import fs from 'fs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

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
    console.log('Info logged successfully.  UTILS.JS');
  });
}

function logRequest(req,res) {
  const datos = [];
  datos.push('\n','--- Request Log ---');//Marca el inicio del log de la petición
  datos.push(`Request URL: ${req.url}`);//Guarda en un log la URL de la petición
  datos.push(`Request Method: ${req.method}`);//Guarda en un log el método de la petición
  datos.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición
  datos.push(`Client IP: ${req.ip}`);//Guarda en un log la IP del cliente
  fs.appendFile('request.log', datos.join('\n'), (err) => {
     if (err) throw err;
     console.log('Request logged successfully.  UTILS.JS');
  });
}

function logError(err, req) { //pendiente de implementar
  const errorLog = [];
  console.log('Logging error:',err);
  errorLog.push('\n', '--- Error Log ---');//Marca el inicio del log de errores
  errorLog.push(`Error Message: ${err.message || 'No error message provided'}`);//Guarda en un log el mensaje de error
  errorLog.push(`Request URL: ${req.url || 'No url'}`);//Guarda en un log la URL de la petición que causó el error
  errorLog.push(`Request Method: ${req.method || 'no method'}`);//Guarda en un log el método de la petición que causó el error
  errorLog.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición que causó el error
  fs.appendFile('request.log', errorLog.join('\n'), (err) => {
    if (err) throw err;
    logError(new Error("Error al guardar el log de errores"), { url: req.url, method: req.method });
    console.log('Error logged successfully.  UTILS.JS');
  });
}

function tokenGenerator(user) {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
  if (!token) {
    logError(new Error("Token generation failed"), { url: '/auth/login', method: 'POST' });
    return null; // Return null if token generation fails
  }
  return token;
}

export { isValidEmail, logRequest, logError, logInfo, tokenGenerator };
