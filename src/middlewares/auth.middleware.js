import jwt from 'jsonwebtoken'
import 'dotenv/config';
import { logError } from '../../util.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const authentication = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Asumiendo que el token se envía en el header Authorization como "Bearer <token>"
  console.log('token:', token);
  if (!token || token === undefined) {
    logError('No se proporcionó token de autenticación ----------', req);
    return res.sendStatus(401)//.json({ error: 'No se proporcionó token de autenticación ----------' });
  } else {
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
      if (err) {
        logError(`Error de autenticación: ${err}`, req);
        return res.status(403).json({ error: 'Token inválido' });
      }
      req.user = user; // Guardar la información del usuario en la solicitud
      next();
    });
  };
};
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token || token === undefined) {
    logError('No se proporcionó token de autenticación');
    return res.status(401)//.json({ error: 'No se proporcionó token' });
  }

  // Verificar el token (lógica de verificación aquí)
  next();
};
const isAdmin = (req, res, next) => {
  const userRole = req.user.role; // Asumiendo que el rol del usuario está en req.user

  if (userRole !== 'admin') {
    logError('Acceso denegado. Se requiere rol de administrador.');
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }

  next();
};
export { verifyToken, isAdmin, authentication };