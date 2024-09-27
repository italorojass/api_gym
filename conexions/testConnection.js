const { executeQuery } = require('./database');

async function testConnection() {
  const query = 'SELECT * FROM usuario';
  try {
    const result = await executeQuery(query);
    console.log('Conexión exitosa. Resultados:', result);
  } catch (error) {
    console.error('Error en la prueba de conexión:', error);
  }
}

testConnection();
