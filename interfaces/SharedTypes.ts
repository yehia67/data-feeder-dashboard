import { OracleName } from ".";

export interface IApiKeyRow {
  id: string;
  key: string;
  type: OracleName;
  usage: string;
}
