const jwt = require('jsonwebtoken');
const secretKey = 'academiamarcossantander'; // Cambia esto a una clave secreta más segura

const authenticate = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === '1') {
    next();
  } else {
    res.status(403).json({ message: 'Acceso denegado: Solo los administradores pueden realizar esta acción.' });
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Permiso denegado' });
    }
    next();
  };
};

module.exports = { authenticate, authorize,isAdmin  };
