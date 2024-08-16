/* const config = {
  user: 'sa1',
  password: 'italo', // Reemplaza 'your_password' con la contraseña de tu usuario sa1
  server: 'DESKTOP-K1ECH6M\\SQLEXPRESS',
  database: 'GymDB', // Reemplaza 'your_database_name' con el nombre de tu base de datos
  options: {
      encrypt: false, // Si estás usando SQL Server en una red local y no necesitas cifrado, puedes dejar esto en false
      trustServerCertificate: true, // Si estás conectándote a un servidor con un certificado autofirmado, puede ser necesario
  },
  port: 1433 // Asegúrate de que este sea el puerto correcto para tu instancia de SQL Server
};

module.exports = config;
 */

const config = {
  host: '127.0.0.1',  
  port : '3306',// Reemplaza con tu host de MySQL
  user: 'italo',  // Reemplaza con tu usuario de MySQL
  password: '1313',  // Reemplaza con tu contraseña de MySQL
  database: 'gym_ams'  // El nombre de la base de datos
};

module.exports = config;
