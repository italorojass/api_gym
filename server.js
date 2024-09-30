
const express = require('express');
const routes = require('./routes/index');
const app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const http = require('http');
const port = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
 app.use(bodyParser.json());
 app.use('/api', routes);
 app.use('healtcheck','Servidor funcionando')

// Server creation
var server = http.createServer(app);
//server.listen(port);
server.listen(port, () => {
  console.log(`Servidor funcionando en el puerto: ${port}`);
});