const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

const directoryPath = '.'; // current folder
const key = 'vova'; // your encryption key

// Get all files in the directory
const files = fs.readdirSync(directoryPath);

// Filter for .json and .md files, but exclude package.json and package-lock.json
const targetFiles = files.filter(file => {
  const isJsonOrMd = file.endsWith('.json') || file.endsWith('.md');
  const isNotPackageFiles = file !== 'package.json' && file !== 'package-lock.json';
  return isJsonOrMd && isNotPackageFiles;
});

// Encrypt each file
targetFiles.forEach(file => {
  const inputPath = path.join(directoryPath, file);
  const outputPath = `${inputPath}.enc`;

  const content = fs.readFileSync(inputPath, 'utf8');
  const encrypted = CryptoJS.AES.encrypt(content, key).toString();

  fs.writeFileSync(outputPath, encrypted);
  console.log(`Encrypted ${file} -> ${outputPath}`);
});
