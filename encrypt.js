const fs = require('fs');
const path = require('path');
const CryptoJS = require('crypto-js');

const directoryPath = '.'; // current folder
const key = 'zzz'; // your encryption key

// Get all files in the directory
const files = fs.readdirSync(directoryPath);

// Filter for .json and .md files
const targetFiles = files.filter(file => file.endsWith('.json') || file.endsWith('.md'));

// Encrypt each file
targetFiles.forEach(file => {
  const inputPath = path.join(directoryPath, file);
  const outputPath = `${inputPath}.enc`;

  const content = fs.readFileSync(inputPath, 'utf8');
  const encrypted = CryptoJS.AES.encrypt(content, key).toString();

  fs.writeFileSync(outputPath, encrypted);
  console.log(`Encrypted ${file} -> ${outputPath}`);
});
