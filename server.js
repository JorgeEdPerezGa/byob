const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.locals.title = 'byob';
app.set('secretKey', 'disneyprincess');

const checkAuth = (request, response, next) => {
  if (!request.params.token) {
    response
      .status(403)
      .send({error: 'You must be authorized to hit this endpoint'})
  }
  try {
    const decoded = jwt.verify(request.params.token, app.get('secretKey'));
    const emailInPieces = decoded.body.email.split('@');
    const approvedEmailBool = emailInPieces[emailInPieces.length - 1] === 'turing.io' ? true : false;
    const hasAppName = decoded.body.appName ? true : false;
    if (!hasAppName) {
      console.log('has no app name')
      return response
              .status(403)
              .send({ error: 'must have application'});
    } else if (!approvedEmailBool) {
      console.log('has no approved email')
      return response
              .status(403)
              .send({ error: 'not authorized to access this endpoint'});
    } else {
      console.log('next')
      next();
    }
  } catch (err) {
    return response
      .status(403)
      .send({error: 'invalid token'});
  }
}

app.post('/api/v1/authenticate', (request, response, next) => {
  const { body } = request;

  for(let requiredParameter of ['appName', 'email']) {
    if(!body[requiredParameter]) {
      response
        .status(404)
        .send({error: `expected ${requiredParameter} in body` })
    }
  }

  const token = jwt.sign({ body }, app.get('secretKey'));
  response
    .status(201)
    .send({token})
})

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
      return response.status(200).json(county);
  })
  .catch(error => response.status(500))
})

function* offsetGenerator() {
  yield 0;

  let offset = 0;
  while (offset < 19000) {
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

app.post('/api/v1/organisms/:token', checkAuth, async (request, response) => {
  const requestBody = request.body
  for (let requiredParams of ['common_name', 'scientific_name', 'name', 'taxonomic_group', 'federal_extinction']) {
    if(!requestBody[requiredParams]) {
      return response
        .status(422)
        .send({error: `Expected format: {common_name: <string>, scientific_name: <string>, name: <string>, taxonomic_group: <string>, federal_extinction: <string>}, missing parameter: ${requiredParams}`})
    }
  }
  const countyId = await database('counties').where('name', requestBody.name)
  let insertBody = {...requestBody}
  delete insertBody.name;
  insertBody.county_id = countyId[0].id;

  database('organisms').insert(insertBody, 'id')
    .then(id => {
      return response.status(201).send({ id: id[0] });
    })
    .catch(error => {
      return response.status(500).send({error});
    })
})

app.delete('/api/v1/organisms/:id/:token', checkAuth, (request, response) => {
  database('organisms').where('id', request.params.id).del()
    .then(id => {
      response.status(204).json(id);
    })
    .catch(error => {
      response.status(500).json(error)
    })
})

app.patch('/api/v1/organisms/:id/:token', checkAuth, async (request, response) => {
  const paramsArr = ['common_name', 'scientific_name', 'name', 'taxonomic_group', 'federal_extinction'];
  const requestBody = request.body;
  for (let requiredParams of paramsArr) {
    if (!requestBody[requiredParams]) {
      return response
        .status(422)
        .send({
          error: `Expected format: {
            common_name: <string>, 
            scientific_name: <string>, 
            name: <string>, 
            taxonomic_group: <string>, 
            federal_extinction: <string>
          }, 
          missing parameter: ${requiredParams}`
        })
    }
  }
  const { id } = request.params;
  const organismDb = await database('organisms').where('id', id).select();

  if (!organismDb.length) {
    return response.status(404).send({
              error: 'This organism is not in our database'
            }); 
  }
  const countyId = await database('counties').where('name', requestBody.name).select();
  let insertBody = {...requestBody}
  
  delete insertBody.name;
  insertBody.county_id = countyId[0].id;

  database('organisms').where('id', id).update(insertBody, 'id')
    .then(id => {
      return response.status(200).json({...insertBody, id: id[0]})
    })
    .catch(error => {
      return response.status(500).json({ error })
    });
});

app.listen(app.get('port'), () => {
  console.log(`server running on port ${app.get('port')}`)
})

module.exports = app;
