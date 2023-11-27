
import { ethers } from "ethers";
import { provider } from ".";
import { OracleFetcherArtifacts } from "@/artifacts/OracleFetcher";
import { OraclePriceArtifacts } from "@/artifacts/OraclePrice";
import { OraclePokemonArtifacts } from "@/artifacts/OraclePokemon";


export const oracleFetcherContract = new ethers.Contract(
  OracleFetcherArtifacts.address,
  OracleFetcherArtifacts.abis,
  provider
);

export const oraclePriceContract = new ethers.Contract(
  OraclePriceArtifacts.address,
  OraclePriceArtifacts.abis,
  provider
);

export const oraclePokemonContract = new ethers.Contract(
  OraclePokemonArtifacts.address,
  OraclePokemonArtifacts.abis,
  provider
);
