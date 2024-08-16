const mysql = require('mysql2/promise');
const config = require('./dbConfig');

async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(config);
    //console.log('Conectado a la base de datos MySQL');
    return connection;
  } catch (error) {
    console.error('Error al conectar a la base de datos', error);
    throw error;
  }
}

async function executeQuery(query, params = []) {
  let connection;
  try {
    connection = await connectToDatabase();
    const [results] = await connection.execute(query, params);
    return results;
  } catch (error) {
    console.error('Error al ejecutar la consulta', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}


module.exports = {connectToDatabase, executeQuery };
