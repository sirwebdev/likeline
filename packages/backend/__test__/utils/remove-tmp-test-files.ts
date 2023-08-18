import fs from 'fs';
import path from 'path';

export const removeTmpTestFiles = (directory: string): void => {
  const files = fs.readdirSync(directory);
  const jsonFiles = files.filter(file => path.extname(file) === '.test');

  jsonFiles.forEach(file => {
    fs.unlinkSync(path.join(directory, file));
  });
};

