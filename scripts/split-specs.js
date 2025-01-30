const fs = require('fs');
const path = require('path');

const specsDir = './cypress/e2e';
const containerIndex = parseInt(process.argv[2], 10) - 1; // Índice começa de 1
const totalContainers = parseInt(process.argv[3], 10);

// Função para encontrar todos os arquivos de teste dentro das subpastas
function getAllSpecs(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllSpecs(filePath)); // Recursivamente busca subpastas
    } else if (file.endsWith('.cy.js')) {
      results.push(filePath);
    }
  });
  return results;
}

const allSpecs = getAllSpecs(specsDir);

// Divide os testes proporcionalmente entre os containers
const chunkSize = Math.ceil(allSpecs.length / totalContainers);
const start = containerIndex * chunkSize;
const end = Math.min(start + chunkSize, allSpecs.length);
const specsToRun = allSpecs.slice(start, end);

if (specsToRun.length > 0) {
  console.log(specsToRun.join(','));
} else {
  console.log(""); // Retorna string vazia se não houver testes para esse container
}
