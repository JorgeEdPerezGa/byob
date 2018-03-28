const countiesData = require('../../../countiesData.json');
const organismsData = require('../../../organismsData.js')

const createOrganism = (knex, organism, county) => {
  return knex('counties').where('name', county).first()
  .then((countyRecord) => {
    if(countyRecord) {
      return knex('organisms').insert({
        taxonomic_group: organism.taxonomic_group,
        scientific_name: organism.scientific_name,
        common_name: organism.common_name,
        federal_extinction: organism.federal_extinction,
        county_id: countyRecord.id
      })
    }
  })
}

exports.seed = function(knex, Promise) {
  return knex('organisms').del()
  .then(() => {
    return knex('counties').del();
  })
  .then(() => {
    return knex('counties').insert(countiesData.data);
  })
  .then(() => {
    let organismPromises = [];
    JSON.parse(organismsData).forEach((organism) => {
      let county = organism.name;
      organismPromises.push(createOrganism(knex, organism, county));
    });
    return Promise.all(organismPromises);
  })
};
