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
      .send({error: 'You must be authorized to hit this endpoint'});
  }
  try {
    const decoded = jwt.verify(request.params.token, app.get('secretKey'));
    const emailInPieces = decoded.body.email.split('@');
    const approvedEmailBool =
      emailInPieces[emailInPieces.length - 1] === 'turing.io'
        ? true : false;
    const hasAppName = decoded.body.appName ? true : false;
    if (!hasAppName) {
      return response
        .status(403)
        .send({ error: 'must have application'});
    } else if (!approvedEmailBool) {
      return response
        .status(403)
        .send({ error: 'not authorized to access this endpoint'});
    } else {
      next();
    }
  } catch (error) {
    return response
      .status(403)
      .send({error: 'invalid token'});
  }
};

app.post('/api/v1/authenticate', (request, response) => {
  const { body } = request;

  for (let requiredParameter of ['appName', 'email']) {
    if (!body[requiredParameter]) {
      response
        .status(404)
        .send({error: `expected ${requiredParameter} in body` });
    }
  }

  const token = jwt.sign({ body }, app.get('secretKey'));
  response
    .status(201)
    .send({token});
});

app.use(express.static('public'));

app.get('/', (request, response) => {
  response.send('byob');
});

app.get('/api/v1/counties', (request, response) => {
  database('counties').select()
    .then(counties => response.status(200).json(counties))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/counties/:id', (request, response) => {
  database('counties').where('id', request.params.id).select()
    .then(county => {
      return response.status(200).json(county);
    })
    .catch(error => response.status(500).json({error}));
});

app.post('/api/v1/counties/:token', checkAuth, async (request, response) => {
  const county = request.body;
  const { name, county_pop_2015, county_area } = county;

  if (!name || !county_pop_2015 || !county_area) {
    return response
      .status(422)
      .send({ error: `missing property.` });
  }

  database('counties').insert(county, '*')
    .then(responseCounty => {
      response.status(201).json(responseCounty);
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.patch('/api/v1/counties/:id/:token',
  checkAuth,
  async (request, response) => {
    const county = request.body;
    const { name, county_pop_2015, county_area } = county;

    if (!name || !county_pop_2015 || !county_area) {
      return response
        .status(422)
        .send({
          error: `Expected format: {
          name: <string>,
          county_pop_2015: <string>,
          county_area: <string>
          }`
        });
    }
    const { id } = request.params;
    const countyDb = await database('counties').where('id', id).select();
    if (!countyDb.length) {
      return response.status(404).send({
        error: 'This county is not in our database'
      });
    }

    database('counties').where('id', id).update(county, 'id')
      .then(id => {
        return response
          .status(200)
          .json(Object.assign({}, county, {id: id[0]} ));
      })
      .catch(error => {
        return response.status(500).json({ error });
      });
  });

app.delete('/api/v1/counties/:id/:token', checkAuth, (request, response) => {
  database('counties').where('id', request.params.id).del()
    .then(id => {
      response.status(204).json(id);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

function* offsetGenerator() {
  yield 0;

  let offset = 0;
  while (offset < 19000) {
    yield offset += 20;
  }
}
const gen = offsetGenerator();

app.get('/api/v1/organisms', async (request, response) => {
  const { federal_extinction } = request.query;

  if (federal_extinction) {
    const federalExtinctionParsed = federal_extinction.split('_').join(' ');
    const fedExtOrgs = await database('organisms')
      .where('federal_extinction', federalExtinctionParsed)
      .select();
    if (fedExtOrgs.length) {
      return response.status(200).json(fedExtOrgs);
    } else {
      return response
        .status(404)
        .json(`No organisms have status ${federal_extinction}`);
    }
  }

  const offset = gen.next().value;
  database('organisms').select().limit(20).offset(offset)
    .then(organisms => {
      return response.status(200).json(organisms);
    })
    .catch(error => {
      return response.status(500).json({error});
    });
});

app.get('/api/v1/organisms/:id', (request, response) => {
  database('organisms').where('id', request.params.id).select()
    .then(organism => {
      if (organism.length) {
        return response.status(200).json(organism);
      } else {
        return response.status(404).json({
          error: `Could not find organism with id: ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/organisms/:token', checkAuth, async (request, response) => {
  const requestBody = request.body;
  const paramsArr = [
    'common_name',
    'scientific_name',
    'name',
    'taxonomic_group',
    'federal_extinction'
  ];
  for (let requiredParams of paramsArr) {
    if (!requestBody[requiredParams]) {
      return response
        .status(422)
        .send({
          error: `Expected format: {
            common_name: <string>,
            scientific_name: <string>,
            name: <string>, taxonomic_group: <string>,
            federal_extinction: <string>
          },
          missing parameter: ${requiredParams}`
        });
    }
  }
  const countyId = await database('counties').where('name', requestBody.name);
  let insertBody = Object.assign({}, requestBody);
  delete insertBody.name;
  insertBody.county_id = countyId[0].id;

  database('organisms').insert(insertBody, 'id')
    .then(id => {
      return response.status(201).send({ id: id[0] });
    })
    .catch(error => {
      return response.status(500).send({error});
    });
});

app.delete('/api/v1/organisms/:id/:token', checkAuth, (request, response) => {
  database('organisms').where('id', request.params.id).del()
    .then(id => {
      response.status(204).json(id);
    })
    .catch(error => {
      response.status(500).json(error);
    });
});

app.patch('/api/v1/organisms/:id/:token',
  checkAuth,
  async (request, response) => {
    const paramsArr = [
      'common_name',
      'scientific_name',
      'name',
      'taxonomic_group',
      'federal_extinction'
    ];
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
          });
      }
    }
    const { id } = request.params;
    const organismDb = await database('organisms').where('id', id).select();

    if (!organismDb.length) {
      return response.status(404).send({
        error: 'This organism is not in our database'
      });
    }
    const countyId = await database('counties')
      .where('name', requestBody.name)
      .select();
    let insertBody = Object.assign({}, requestBody);

    delete insertBody.name;
    insertBody.county_id = countyId[0].id;

    database('organisms').where('id', id).update(insertBody, 'id')
      .then(id => {
        return response
          .status(200)
          .json(Object.assign({}, insertBody, {id: id[0]}));
      })
      .catch(error => {
        return response
          .status(500)
          .json({ error });
      });
  });

app.listen(app.get('port'), () => {
  // eslint-disable-next-line
  console.log(`server running on port ${app.get('port')}`);
});

module.exports = app;
