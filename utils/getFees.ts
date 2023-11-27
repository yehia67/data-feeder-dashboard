import { OracleName } from "@/interfaces";
import { formatEther } from "ethers";
import { oracleFetcherContract, oraclePokemonContract, oraclePriceContract } from "./contracts";

export const getFees = async (oracleName: OracleName) => {
  if (oracleName === "OracleFetcher") {
    return formatEther(
      await oracleFetcherContract.getFunction("flatFee").staticCall()
    );
  }

  if (oracleName === "OraclePrice") {
    return formatEther(
      await oraclePriceContract.getFunction("flatFee").staticCall()
    );
  }
  return formatEther(
    await oraclePokemonContract.getFunction("flatFee").staticCall()
  );
};
