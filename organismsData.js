const rawData = require('./rawData');

const cleanSpeciesData = () => {
  return rawData.data.map(species => {
    return {
      countyName: species[8],
      taxonomicGroup: species[10],
      scientificName: species[12],
      commonName: species[13],
      fedListing: species[16]
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