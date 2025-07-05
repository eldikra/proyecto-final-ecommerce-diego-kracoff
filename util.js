import fs from 'fs';

function isValidEmail(email) {
  // Validacion de email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
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
     console.log('Request logged successfully.');
  });
}

function logError(err, req) { //pendiente de implementar
  const errorLog = [];
  errorLog.push('\n', '--- Error Log ---');//Marca el inicio del log de errores
  errorLog.push(`Error Message: ${err.message}`);//Guarda en un log el mensaje de error
  errorLog.push(`Request URL: ${req.url}`);//Guarda en un log la URL de la petición que causó el error
  errorLog.push(`Request Method: ${req.method}`);//Guarda en un log el método de la petición que causó el error
  errorLog.push(`Request Date: ${new Date().toISOString()}`);//Guarda en un log la fecha de la petición que causó el error
  fs.appendFile('request.log', errorLog.join('\n'), (err) => {
    if (err) throw err;
    console.log('Error logged successfully.');
  });
}
export { isValidEmail, logRequest, logError };
