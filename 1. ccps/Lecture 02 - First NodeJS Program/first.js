console.log('KG coding is the best');

const fs = require('fs');
fs.writeFile("output.txt", "Writing file", (err) => {
  if(err) console.log(err);
  else console.log('File written successfully');
})