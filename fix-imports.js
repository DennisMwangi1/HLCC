const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'src', 'components', 'ui');

// Read all files in the components directory
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  // Process each file
  files.forEach(file => {
    if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const filePath = path.join(componentsDir, file);
      
      // Read file content
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(`Error reading file ${file}:`, err);
          return;
        }

        // Remove version numbers from imports
        const updatedContent = data.replace(
          /from "([^"@]+)@\d+\.\d+(?:\.\d+)?([^"]*)"/g,
          'from "$1$2"'
        );

        // Write the updated content back to the file
        if (updatedContent !== data) {
          fs.writeFile(filePath, updatedContent, 'utf8', err => {
            if (err) {
              console.error(`Error writing file ${file}:`, err);
              return;
            }
            console.log(`Fixed imports in ${file}`);
          });
        }
      });
    }
  });
});
