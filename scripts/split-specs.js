const fs = require('fs');

const allSpecs = fs.readdirSync('./cypress/e2e').filter(file => file.endsWith('.cy.js'));
const containerIndex = parseInt(process.argv[2]) - 1; // Começa do 1, então ajustamos
const totalContainers = parseInt(process.argv[3]);

const chunkSize = Math.ceil(allSpecs.length / totalContainers);
const specsToRun = allSpecs.slice(containerIndex * chunkSize, (containerIndex + 1) * chunkSize);

console.log(specsToRun.map(spec => `cypress/e2e/${spec}`).join(','));
