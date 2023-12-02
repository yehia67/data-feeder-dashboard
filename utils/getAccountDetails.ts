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
      }) as Promise<number>,
      readContract({
        address: OraclePriceArtifacts.address,
        abi: OraclePriceArtifacts.abis,
        functionName: "apiKeyByAddress",
      }) as Promise<number>,
      readContract({
        address: OraclePokemonArtifacts.address,
        abi: OraclePokemonArtifacts.abis,
        functionName: "apiKeyByAddress",
      }) as Promise<number>,
    ]);

  const oracleFetchUsage =
    oracleFetcherKey !== 0
      ? ((await readContract({
          address: OracleFetcherArtifacts.address,
          abi: OracleFetcherArtifacts.abis,
          functionName: "apiKeyUsage",
          args: [oracleFetcherKey],
        })) as number)
      : 0;

  if (oracleFetcherKey.toString() !== "0") {
    apiRows.push({
      id: oracleFetchUsage,
      key: oracleFetcherKey,
      usage: oracleFetchUsage,
      type: "OracleFetcher",
    });
  }

  const oraclePriceUsage =
    oraclePriceKey !== 0
      ? ((await readContract({
          address: OraclePriceArtifacts.address,
          abi: OraclePriceArtifacts.abis,
          functionName: "apiKeyUsage",
          args: [oraclePriceKey],
        })) as number)
      : 0;

  if (oraclePriceKey.toString() !== "0") {
    apiRows.push({
      id: oraclePriceKey,
      key: oraclePriceKey,
      usage: oraclePriceUsage,
      type: "OraclePrice",
    });
  }

  const oraclePokemonUsage =
    oraclePokemonKey !== 0
      ? ((await readContract({
          address: OraclePokemonArtifacts.address,
          abi: OraclePokemonArtifacts.abis,
          functionName: "apiKeyUsage",
          args: [oraclePokemonKey],
        })) as number)
      : 0;

  if (oraclePokemonUsage.toString() !== "0") {
    apiRows.push({
      id: oraclePokemonKey,
      key: oraclePokemonKey,
      usage: oraclePokemonUsage,
      type: "OracleNFT",
    });
  }

  console.log({ apiRows });
  return apiRows;
};
