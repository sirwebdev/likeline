import { unlinkSync } from 'fs';
import path from 'path';

export default async function(): Promise<void> {
  const filePath = path.join(__dirname, '..', 'testDB.sqlite');

  try {
    unlinkSync(filePath);
    console.log('Successfully removed the SQLite file after tests');
  } catch (err) {
    console.warn(`Error removing SQLite file: ${err}`);
  }
};
