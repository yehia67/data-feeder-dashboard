import { BaseOracle } from "./BaseOracle";

export const OraclePriceArtifacts = Object.freeze({
  address: "0x1e2928B34D1E4D46aBC1b5D497fFdaB5459A0bbA",
  abis: [
    ...BaseOracle.abis,
    {
      inputs: [
        {
          internalType: "string",
          name: "fiatSymbol",
          type: "string",
        },
        {
          internalType: "string",
          name: "ccSymbol",
          type: "string",
        },
      ],
      name: "requestOracle",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "payable",
      type: "function",
    },
  ],
});
