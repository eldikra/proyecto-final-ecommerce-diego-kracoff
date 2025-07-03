const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'No se proporcionó token' });
  }

  // Verificar el token (lógica de verificación aquí)
  next();
};
const isAdmin = (req, res, next) => {
  const userRole = req.user.role; // Asumiendo que el rol del usuario está en req.user

  if (userRole !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requiere rol de administrador.' });
  }

  next();
};
export { verifyToken, isAdmin };