const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


app.locals.title = 'byob';

app.get('/', (request, response) => {
  response.send('byob');
})

app.get('/api/v1/counties', (request, response) => {
  database('counties').select()
    .then(counties => response.status(200).json(counties))
    .catch(error => response.status(500).json({ error }))
})

app.get('/api/v1/counties/:id', (request, response) => {
  database('counties').where('id', request.params.id).select()
  .then(county => {
      return response.status(200).json(county)
  })
})

function* offsetGenerator() {
  yield 0;

  let offset = 0;
  while(offset < 19000) {
    yield offset += 20;
  }
}
const gen = offsetGenerator();

app.get('/api/v1/organisms', (request, response) => {
  const offset = gen.next().value;
  database('organisms').select().limit(20).offset(offset)
    .then(organisms => {
      return response.status(200).json(organisms);
    })
    .catch(err => {
      return response.status(500).json({error});
    })
})

app.get('/api/v1/organisms/:id', (request, response) => {
  database('organisms').where('id', request.params.id).select()
  .then(organism => {
    if(organism) {
      return response.status(200).json(organism);
    } else {
      return response.status(404).json({
        error: `Could not find organism with id: ${request.params.id}`
      })
    }
  })
  .catch(err => {
    response.status(500).json({err})
  })
})

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`)
})

module.exports = app;
