const fs = require('fs');

const allSpecs = fs.readdirSync('./cypress/e2e').filter(file => file.endsWith('.cy.js'));
const numWorkers = parseInt(process.env.WORKERS) || 3;

const chunkSize = Math.ceil(allSpecs.length / numWorkers);
const workerIndex = parseInt(process.env.WORKER_INDEX) || 0;
const specsToRun = allSpecs.slice(workerIndex * chunkSize, (workerIndex + 1) * chunkSize);

console.log(specsToRun.join(','));
