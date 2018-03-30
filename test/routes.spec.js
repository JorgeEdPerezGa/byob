const chai =  require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
        .then(() => {
          return database.seed.run()
          .then(() => {
            done()
        })
      })
    })
  })

  describe('GET /api/v1/counties', () => {
    it('should return counties', () => {
      return chai.request(server)
      .get('/api/v1/counties')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(2);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('county_pop_2015');
        response.body[0].should.have.property('county_area');
      })
    })

    it('returns a 404 status if endpoint does not exist', () => {
      return chai.request(server)
      .get('/api/v1/fake')
      .then(response => {
        response.should.have.status(404)
      })
      .catch(err => {
        throw err;
      })
    })
  })

  describe('GET /api/v1/counties/:id', () => {
    it('should return an specific county', () => {
      return chai.request(server)
      .get('/api/v1/counties/1')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.should.be.a('object');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('county_pop_2015');
        response.body[0].should.have.property('county_area');
      })
    })
    it('returns a 404 status if endpoint does not exist', () => {
      return chai.request(server)
      .get('/api/v1/fake')
      .then(response => {
        response.should.have.status(404)
      })
      .catch(err => {
        throw err;
      })
    })
  })

  describe('GET /api/v1/organisms', () => {
    it('should return organisms', () => {
      return chai.request(server)
      .get('/api/v1/organisms')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(20);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('common_name');
        response.body[0].should.have.property('scientific_name');
        response.body[0].should.have.property('taxonomic_group');
        response.body[0].should.have.property('federal_extinction');
        response.body[0].should.have.property('county_id');
      })
      .catch(err => {
        throw err;
      })
    })

    it('returns a 404 status if endpoint does not exist', () => {
      return chai.request(server)
      .get('/api/v1/ooooooo')
      .then(response => {
        response.should.have.status(404)
      })
      .catch(err => {
        throw err;
      })
    })
  })

  describe('GET /api/v1/organisms/:id', () => {
    it('should return organism with matching id if it exists in database', () => {
      return chai.request(server)
      .get('/api/v1/organisms/8')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('id');
        response.body[0].should.have.property('common_name');
        response.body[0].should.have.property('scientific_name');
        response.body[0].should.have.property('taxonomic_group');
        response.body[0].should.have.property('federal_extinction');
        response.body[0].should.have.property('county_id');
      })
      .catch(err => {
        throw err;
      })
    })

    it('returns a 404 status if id does not exist', () => {
      return chai.request(server)
      .get('/api/v1/organisms/500')
      .then(response => {
        response.should.have.status(404);
      })
      .catch(err => {
        throw err;
      })
    })
  })

  describe('PATCH /api/v1/organisms/:id/:token', () => {
    it('updates an existing entry and returns patched object and id', () => {
      return chai.request(server)
      .patch('/api/v1/organisms/4/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7ImFwcE5hbWUiOiJncmVhdCBhcHAiLCJlbWFpbCI6ImJsYWhAdHVyaW5nLmlvIn0sImlhdCI6MTUyMjM3NjA0Nn0.zK2_ujpj2cpOBHxLpdw9q_wEQcWIsFU2Hyu3xj1gCk0')
      .send({
        common_name: 'White Footed Mouse',
        scientific_name: 'Peromyscus leucopus',
        name: 'Neverland',
        taxonomic_group: 'Mammal',
        federal_extinction: 'not listed'
      })
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.should.have.property('common_name');
        response.body.should.have.property('scientific_name');
        response.body.should.have.property('taxonomic_group');
        response.body.should.have.property('federal_extinction');
        response.body.should.have.property('county_id');
      })
    })
  })

  describe('DELETE /api/v1/organisms/:id/:token', () => {
    it('deletes an organism with matching id', () => {
      return chai.request(server)
      .delete('/api/v1/organisms/1/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7ImFwcE5hbWUiOiJncmVhdCBhcHAiLCJlbWFpbCI6ImJsYWhAdHVyaW5nLmlvIn0sImlhdCI6MTUyMjM3NjA0Nn0.zK2_ujpj2cpOBHxLpdw9q_wEQcWIsFU2Hyu3xj1gCk0')
      .then(response => {
        response.should.have.status(204);
      })
      .catch(err => {
        throw err;
      })
    })
  })

  describe('POST /api/v1/organisms/:token', () => {
    it('makes a post and returns the id of organism inserted', () => {
      return chai.request(server)
      .post('/api/v1/organisms/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJib2R5Ijp7ImFwcE5hbWUiOiJncmVhdCBhcHAiLCJlbWFpbCI6ImJsYWhAdHVyaW5nLmlvIn0sImlhdCI6MTUyMjM3NjA0Nn0.zK2_ujpj2cpOBHxLpdw9q_wEQcWIsFU2Hyu3xj1gCk0')
      .send({
        common_name: 'White Footed Mouse',
        scientific_name: 'Peromyscus leucopus',
        name: 'Neverland',
        taxonomic_group: 'Mammal',
        federal_extinction: 'not listed'
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(41);
      })
      .catch(err => {
        console.log(err)
        throw err;
      })
      
    })
  })

})
