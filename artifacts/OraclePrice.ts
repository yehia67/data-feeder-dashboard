import { BaseOracle } from "./BaseOracle";

export const OraclePriceArtifacts = Object.freeze({
  address: "0xE4688df8D063b8dC7D0a187737046D97D3EaB5ee",
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
