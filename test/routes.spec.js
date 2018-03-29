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
        response.body[0].id.should.equal(1);
        response.body[0].should.have.property('common_name');
        response.body[0].common_name.should.equal('American Toad');
        response.body[0].should.have.property('scientific_name');
        response.body[0].scientific_name.should.equal('Anaxyrus americanus');
        response.body[0].should.have.property('taxonomic_group');
        response.body[0].taxonomic_group.should.equal('Amphibians');
        response.body[0].should.have.property('federal_extinction');
        response.body[0].federal_extinction.should.equal('not listed');
        response.body[0].should.have.property('county_id');
        response.body[0].county_id.should.equal(2);
      })
    })
  })

})
