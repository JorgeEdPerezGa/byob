const mockCounties = [
  {
    "name":"Neverland",
    "county_pop_2015":"98,268",
    "county_area":"523.45"
  },
  {
    "name":"Genovia",
    "county_pop_2015":"77,922",
    "county_area":"1309.85"
}]

const mockOrganisms = [
  {
    "name":"Genovia",
    "taxonomic_group":"Amphibians",
    "scientific_name":"Anaxyrus americanus",
    "common_name":"American Toad",
    "federal_extinction":"not listed"
  },
  {
    "name":"Neverland",
    "taxonomic_group":"Reptiles",
    "scientific_name":"Crotalus horridus",
    "common_name":"Timber Rattlesnake",
    "federal_extinction":"not listed"
  }
]

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
      return knex('counties').insert(mockCounties);
    })
    .then(() => {
      let organismPromises = [];
      mockOrganisms.forEach((organism) => {
        let county = organism.name;
        organismPromises.push(createOrganism(knex, organism, county));
      });
      return Promise.all(organismPromises);
    })
};
