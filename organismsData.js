const rawData = require('./rawdata.json');

const cleanSpeciesData = () => {
  return rawData.data.map(species => {
    return {
      name: species[8],
      taxonomic_group: species[10],
      scientific_name: species[12],
      common_name: species[13],
      federal_extinction: species[16]
    };
  });
};

const speciesData = cleanSpeciesData();

module.exports = JSON.stringify(speciesData);