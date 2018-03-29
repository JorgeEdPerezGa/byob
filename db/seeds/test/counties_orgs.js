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
  },
  {
    "name": "Genovia",
    "scientific_name": "Hyla versicolor",
    "common_name": "Gray Treefrog",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Lithobates catesbeianus",
    "common_name": "Bullfrog",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Lithobates clamitans",
    "common_name": "Green Frog",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Lithobates palustris",
    "common_name": "Pickerel Frog",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Lithobates pipiens",
    "common_name": "Northern Leopard Frog",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Pseudacris crucifer",
    "common_name": "Spring Peeper",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Ambystoma jeffersonianum x laterale",
    "common_name": "Jefferson Salamander Complex",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Ambystoma laterale",
    "common_name": "Blue-spotted Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Scaphiopus holbrookii",
    "common_name": "Eastern Spadefoot",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Ambystoma maculatum",
    "common_name": "Spotted Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Lithobates sylvaticus",
    "common_name": "Wood Frog",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Desmognathus fuscus",
    "common_name": "Dusky Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Eurycea bislineata",
    "common_name": "Northern Two-lined Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Ambystoma tigrinum",
    "common_name": "Tiger Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Gyrinophilus porphyriticus",
    "common_name": "Spring Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Desmognathus ochrophaeus",
    "common_name": "Allegheny Mountain Dusky Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Hemidactylium scutatum",
    "common_name": "Four-toed Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Genovia",
    "scientific_name": "Notophthalmus viridescens",
    "common_name": "Eastern Newt",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Plethodon cinereus",
    "common_name": "Redback Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Pseudotriton ruber",
    "common_name": "Red Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Bat Colony",
    "common_name": "Bat Colony",
    "taxonomic_group": "Animal Assemblages",
    "federal_extinction": "not applicable"
  },
  {
    "name": "Neverland",
    "scientific_name": "Bombus (Bombus) affinis",
    "common_name": "Rusty-patched Bumble Bee",
    "taxonomic_group": "Bees, Wasps, and Ants",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Bombus (Bombus) terricola",
    "common_name": "Yellowbanded Bumble Bee",
    "taxonomic_group": "Bees, Wasps, and Ants",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Agelaius phoeniceus",
    "common_name": "Red-winged Blackbird",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Bombus (Thoracobombus) pensylvanicus",
    "common_name": "American Bumble Bee",
    "taxonomic_group": "Bees, Wasps, and Ants",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Plethodon glutinosus",
    "common_name": "Northern Slimy Salamander",
    "taxonomic_group": "Amphibians",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Anadromous Fish Concentration Area",
    "common_name": "Anadromous Fish Concentration Area",
    "taxonomic_group": "Animal Assemblages",
    "federal_extinction": "not applicable"
  },
  {
    "name": "Neverland",
    "scientific_name": "Icterus galbula",
    "common_name": "Baltimore Oriole",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Dolichonyx oryzivorus",
    "common_name": "Bobolink",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Icterus spurius",
    "common_name": "Orchard Oriole",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Molothrus ater",
    "common_name": "Brown-headed Cowbird",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Quiscalus quiscula",
    "common_name": "Common Grackle",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Sturnella magna",
    "common_name": "Eastern Meadowlark",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Cardinalis cardinalis",
    "common_name": "Northern Cardinal",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Passerina cyanea",
    "common_name": "Indigo Bunting",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Pheucticus ludovicianus",
    "common_name": "Rose-breasted Grosbeak",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Piranga olivacea",
    "common_name": "Scarlet Tanager",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  },
  {
    "name": "Neverland",
    "scientific_name": "Baeolophus bicolor",
    "common_name": "Tufted Titmouse",
    "taxonomic_group": "Birds",
    "federal_extinction": "not listed"
  }
];

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
