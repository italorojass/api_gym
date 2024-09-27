const { executeQuery } = require('../conexions/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

//const secretKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJBTVMiLCJhZG1pbmlzdHJhZG9yIjoiTWFyY29zIFNhbnRhbmRlciIsInBheW1lbnQiOiJ0cnVlIn0.l3GvaWIjGlT9EIT6i5LleGzfQaVv36aHzMMiO3X57-Y'; // Cambia esto a una clave secreta más segura
const secretKey = 'academiamarcossantander'; 
// Función de inicio de sesión
const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username y password son requeridos' });
  }

  const query = `SELECT
   nombre_usuario,
   contrasena,
   foto,
   rol
   FROM usuarios WHERE nombre_usuario = ?`;
  const params = [username];

  try {
    const users = await executeQuery(query, params);

    if (users.length === 0) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }
  
    // Verificar la contraseña
    const user = users[0];
    if(user.contrasena != password){
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Generar el token JWT
    const token = jwt.sign(
      { 
      
      role: user.rol , 
      photo : user.foto},
      secretKey,
      { expiresIn: '12h' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

// Función de registro
const register = async (req, res) => {
  const { username, password, email, roleId,phone,photo } = req.body;

  if (!username || !password || !email || !roleId) {
    return res.status(400).json({ message: 'Todos los campos son requeridos' });
  }

  // Generar el hash de la contraseña
  const passwordHash = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO Users (Username, PasswordHash, Email, RoleID, Phone,Photo) VALUES (?, ?, ?, ?,?,?)';
  const params = [username, passwordHash, email, roleId,phone,photo];

  try {
    await executeQuery(query, params);
    res.status(201).json({ message: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error });
  }
};

module.exports = { login, register };