const rawData = require('./rawData.json');

const cleanSpeciesData = () => {
  return rawData.data.map(species => {
    return {
      name: species[8],
      taxonomic_group: species[10],
      scientific_name: species[12],
      common_name: species[13],
      federal_extinction: species[16]
    }
  });
};

const speciesData = cleanSpeciesData();

module.exports = JSON.stringify(speciesData);

// const speciesData = speciesRawData.reduce((allSpecies, current) => {
//   let newAllSpecies = [...allSpecies];
//   newAllSpecies.push({
//     countyName: current[8],
//     taxonomicGroup: current[10],
//     scientificName: current[12],
//     commonName: current[13],
//     fedListing: current[16]
//   })
//   return newAllSpecies;
// }, [])
