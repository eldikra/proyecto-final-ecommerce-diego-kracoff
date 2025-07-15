import  { Router } from 'express';
const router = Router();


router.get('/', (req, res) => {
  res.json({message: 'Bienvenido a la API del Proyecto Final'});
});

router.get('/status', (req, res) => {
  res.json({ status: 'El servidor está en funcionamiento' });
});
router.get('/info', (req, res) => {
  res.json({
    name: 'Proyecto Final',
    version: '1.0.0',
    description: 'API para el proyecto final',
  });
});
router.get('/contact', (req, res) => {
  res.json({
    email: 'eldikra@gmail.com',
    phone: '123-456-7890'
  });
});
router.get('/endpoints', (req, res) => {
  res.json({
    message: 'API endpoint',
    endpoints: [
      { method: 'GET', path: '/status', description: 'Obtener estado del servidor' },
      { method: 'GET', path: '/info', description: 'Obtener información de la API' },
      { method: 'GET', path: '/contact', description: 'Obtener información de contacto' }
    ]
  });
}); 

export { router };