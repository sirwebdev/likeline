import path from "path";

import { removeJsonFiles } from "./utils/remove-json-files";

export default function() {
  const directoryPath = path.join(__dirname, '..', 'uploads');

  removeJsonFiles(directoryPath);
}
