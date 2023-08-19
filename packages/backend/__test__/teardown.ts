import path from "path";

import { removeJsonFiles } from "./utils/remove-json-files";
import { removeTmpTestFiles } from "./utils/remove-tmp-test-files";

export default async function() {
  const directoryPath = path.join(__dirname, '..', 'uploads');

  removeJsonFiles(directoryPath);
  removeTmpTestFiles(directoryPath);

  await global.__MONGO_INSTANCE.stop()
}
