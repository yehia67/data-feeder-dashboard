import { BaseOracle } from "./BaseOracle";

export const OraclePriceArtifacts = Object.freeze({
  address: "0xD28452eb1d98B2c7C60C784435EA6ED056EA02f8",
  abis: [
    ...BaseOracle.abis,
    {
      type: "event",
      name: "OracleRequested",
      inputs: [
        {
          name: "id",
          type: "uint256",
          indexed: true,
          internalType: "uint256",
        },
        {
          name: "caller",
          type: "address",
          indexed: true,
          internalType: "address",
        },
        {
          name: "fiatSymbol",
          type: "string",
          indexed: false,
          internalType: "string",
        },
        {
          name: "ccSymbol",
          type: "string",
          indexed: false,
          internalType: "string",
        },
      ],
      anonymous: false,
    },
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
