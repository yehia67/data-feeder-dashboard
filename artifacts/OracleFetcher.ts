import { BaseOracle } from "./BaseOracle";

export const OracleFetcherArtifacts = Object.freeze({
  address: "0x2EA2dEd6B1Aa3BBa7f932418c7Bf374df7206573",
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
          name: "url",
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
          name: "url",
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
