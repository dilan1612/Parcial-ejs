const routes = require('express').Router();
const guitars = require('../data/guitars');  

const fs = require('fs');
const path = require('path');

routes.get('/', (req, res) => {
  return res.render('index', { 'title': 'Página Inicial', 'data': guitars });
});



const departments = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/departments.json')));



routes.post('/new-record', (req, res) => {
  const { id, name, departamento, municipio } = req.body;
  console.log(`Se recibieron id=${id}, name=${name}, departamento=${departamento}, municipio=${municipio}`);

  if (guitars instanceof Map) {
    guitars.set(Number(id), { name, departamento, municipio });
  }

  console.log('Se ha agregado el nuevo registro y se redireccionará a la página principal');
  res.redirect('/');
});

routes.get('/new-record', (req, res) => {
  return res.render('new-record', {
    title: "Agregar Guitarra",
    departments: departments 
  });
});

module.exports = routes;
