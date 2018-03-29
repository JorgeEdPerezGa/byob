const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

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
    if(organism.length) {
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

app.post('/api/v1/organisms', (request, response) => {
  const requestBody = request.body
  for (let requiredParams of ['common_name', 'scientific_name', 'name', 'taxonomic_group', 'federal_extinction']) {
    if(!requestBody[requiredParams]) {
      return response
        .status(422)
        .send({error: `Expected format: {common_name: <string>, scientific_name: <string>, name: <string>, taxonomic_group: <string>, federal_extinction: <string>}, missing parameter: ${requiredParams}`})
    }
  }

  database('organisms').insert(requestBody, 'id')
    .then(response => {
      return response.status(201).send({ id: response[0] });
    })
    .catch(error => {
      return response.status(500).send({error});
    })
})

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`)
})

module.exports = app;
