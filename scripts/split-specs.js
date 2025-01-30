const fs = require('fs');
const path = require('path');

const specsDir = './cypress/e2e';
const allSpecs = fs
  .readdirSync(specsDir)
  .filter(file => file.endsWith('.cy.js'))
  .map(file => path.join(specsDir, file));

const containerIndex = parseInt(process.argv[2], 10) - 1; // Índice começa de 1
const totalContainers = parseInt(process.argv[3], 10);

const chunkSize = Math.ceil(allSpecs.length / totalContainers);
const specsToRun = allSpecs.slice(containerIndex * chunkSize, (containerIndex + 1) * chunkSize);

console.log(specsToRun.join(','));
