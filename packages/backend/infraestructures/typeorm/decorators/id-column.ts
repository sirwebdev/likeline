import { ObjectIdColumn, PrimaryGeneratedColumn } from "typeorm";
import { isTestEnvironment } from "../datasource";

export function IdColumn() {
  return (target: Object, key: string | symbol): any => {
    if (isTestEnvironment) {
      return PrimaryGeneratedColumn('uuid')(target, key);
    } else {
      return ObjectIdColumn()(target, key);
    }
  }
}
