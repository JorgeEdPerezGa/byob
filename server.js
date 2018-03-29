const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || '3000')

app.get('/api/v1/organisms', (request, response) => {
  database('organisms').select().limit(20).offset(0)
    .then(organisms => {
      response.status(200).json(organisms)
    })
    .catch(err => {
      response.status(500).json({error})
    })
  // knex.select('*').from('users').limit(10).offset(30)
})

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`)
})

module.exports = app;