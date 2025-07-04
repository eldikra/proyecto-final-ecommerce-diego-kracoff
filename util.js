import fs from 'fs';

function isValidEmail(email) {
  // Validacion de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function logRequest(req, res, next) {
  const datos = [];
  datos.push(`Request URL: ${req.url}`);//Guarda en un log la URL de la petición
  datos.push(`Request Method: ${req.method}`);//Guarda en un log el método de la petición
  datos.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición
  datos.push(`Client IP: ${req.ip}`);//Guarda en un log la IP del cliente
  fs.appendFile('request.log', datos.join('\n'), (err) => {
     if (err) throw err;
     console.log('Request logged successfully.');
  });
  next();
}
export { isValidEmail, logRequest };
