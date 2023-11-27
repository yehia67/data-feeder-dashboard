import {
  oracleFetcherContract,
  oraclePokemonContract,
  oraclePriceContract,
} from "./contracts";
import type { IApiKeyRow } from "@/interfaces";

export const getAccountDetails = async (
  address: string
): Promise<IApiKeyRow[]> => {
  const apiRows: IApiKeyRow[] = [];
  const [oracleFetcherKey, oraclePriceKey, oraclePokemonKey] =
    await Promise.all([
      oracleFetcherContract.getFunction("apiKeyByAddress").staticCall(address),
      oraclePriceContract.getFunction("apiKeyByAddress").staticCall(address),
      oraclePokemonContract.getFunction("apiKeyByAddress").staticCall(address),
    ]);

  const oracleFetchUsage =
    oracleFetcherKey !== 0
      ? await oracleFetcherContract
          .getFunction("apiKeyUsage")
          .staticCall(oracleFetcherKey)
      : 0;
  if (oracleFetcherKey.toString() !== "0") {
    apiRows.push({
      id: oracleFetchUsage.toString(),
      key: oracleFetcherKey.toString(),
      usage: oracleFetchUsage.toString(),
      type: "OracleFetcher",
    });
  }

  const oraclePriceUsage =
    oraclePriceKey !== 0
      ? await oraclePriceContract
          .getFunction("apiKeyUsage")
          .staticCall(oraclePriceKey)
      : 0;

  if (oraclePriceKey.toString() !== "0") {
    apiRows.push({
      id: oraclePriceKey.toString(),
      key: oraclePriceKey.toString(),
      usage: oraclePriceUsage.toString(),
      type: "OraclePrice",
    });
  }

  const oraclePokemonUsage =
    oraclePokemonKey !== 0
      ? await oraclePokemonContract
          .getFunction("apiKeyUsage")
          .staticCall(oraclePokemonKey)
      : 0;

  if (oraclePokemonUsage.toString() !== "0") {
    apiRows.push({
      id: oraclePokemonKey.toString(),
      key: oraclePokemonKey.toString(),
      usage: oraclePokemonUsage.toString(),
      type: "OracleNFT",
    });
  }

  console.log({ apiRows });
  return apiRows;
};
