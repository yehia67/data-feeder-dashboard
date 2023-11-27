import { OracleName } from ".";

 export interface IApiKeyRow {
  id: number;
  key: number;
  type: OracleName;
  usage: number;
}