import { OracleName } from "@/interfaces";
import { formatEther } from "ethers";

import { OracleFetcherArtifacts } from "@/artifacts/OracleFetcher";
import { readContract } from "viem/actions";
import { getPublicClient } from "wagmi/actions";
import { BigNumberish } from "ethers/utils";
import { OraclePriceArtifacts } from "@/artifacts/OraclePrice";
import { OraclePokemonArtifacts } from "@/artifacts/OraclePokemon";

export const getFees = async (oracleName: OracleName) => {
  if (oracleName === "OracleFetcher") {
    const result = (await readContract(getPublicClient(), {
      address: OracleFetcherArtifacts.address,
      abi: OracleFetcherArtifacts.abis,
      functionName: "flatFee",
    })) as BigNumberish;
    return formatEther(result);
  }

  if (oracleName === "OraclePrice") {
    const result = (await readContract(getPublicClient(), {
      address: OraclePriceArtifacts.address,
      abi: OraclePriceArtifacts.abis,
      functionName: "flatFee",
    })) as BigNumberish;
    return formatEther(result);
  }
  const result = (await readContract(getPublicClient(), {
    address: OraclePokemonArtifacts.address,
    abi: OraclePokemonArtifacts.abis,
    functionName: "flatFee",
  })) as BigNumberish;
  return formatEther(result);
};
