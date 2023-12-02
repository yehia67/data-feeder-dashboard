import { OracleFetcherArtifacts } from "@/artifacts/OracleFetcher";
import { OraclePokemonArtifacts } from "@/artifacts/OraclePokemon";
import { OraclePriceArtifacts } from "@/artifacts/OraclePrice";
import type { IApiKeyRow } from "@/interfaces";
import { readContract } from "wagmi/actions";

export const getAccountDetails = async (
  address: string
): Promise<IApiKeyRow[]> => {
  const apiRows: IApiKeyRow[] = [];
  const [oracleFetcherKey, oraclePriceKey, oraclePokemonKey] =
    await Promise.all([
      readContract({
        address: OracleFetcherArtifacts.address,
        abi: OracleFetcherArtifacts.abis,
        functionName: "apiKeyByAddress",
        args: [address],
      }) as Promise<number>,
      readContract({
        address: OraclePriceArtifacts.address,
        abi: OraclePriceArtifacts.abis,
        functionName: "apiKeyByAddress",
        args: [address],
      }) as Promise<number>,
      readContract({
        address: OraclePokemonArtifacts.address,
        abi: OraclePokemonArtifacts.abis,
        functionName: "apiKeyByAddress",
        args: [address],
      }) as Promise<number>,
    ]);

  const oracleFetchUsage =
    oracleFetcherKey !== 0
      ? (
          (await readContract({
            address: OracleFetcherArtifacts.address,
            abi: OracleFetcherArtifacts.abis,
            functionName: "apiKeyUsage",
            args: [oracleFetcherKey],
          })) as number
        ).toString()
      : "0";

  if (oracleFetcherKey.toString() !== "0") {
    apiRows.push({
      id: oracleFetcherKey.toString(),
      key: oracleFetcherKey.toString(),
      usage: oracleFetchUsage,
      type: "OracleFetcher",
    });
  }

  const oraclePriceUsage =
    oraclePriceKey !== 0
      ? (
          (await readContract({
            address: OraclePriceArtifacts.address,
            abi: OraclePriceArtifacts.abis,
            functionName: "apiKeyUsage",
            args: [oraclePriceKey],
          })) as number
        ).toString()
      : "0";
  if (oraclePriceKey.toString() !== "0") {
    apiRows.push({
      id: oraclePriceKey.toString(),
      key: oraclePriceKey.toString(),
      usage: oraclePriceUsage,
      type: "OraclePrice",
    });
  }

  const oraclePokemonUsage =
    oraclePokemonKey !== 0
      ? (
          (await readContract({
            address: OraclePokemonArtifacts.address,
            abi: OraclePokemonArtifacts.abis,
            functionName: "apiKeyUsage",
            args: [oraclePokemonKey],
          })) as number
        ).toString()
      : "0";

  if (oraclePokemonUsage.toString() !== "0") {
    apiRows.push({
      id: oraclePokemonKey.toString(),
      key: oraclePokemonKey.toString(),
      usage: oraclePokemonUsage,
      type: "OracleNFT",
    });
  }

  console.log({ apiRows });
  return apiRows;
};
