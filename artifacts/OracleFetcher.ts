import { BaseOracle } from "./BaseOracle";

export const OracleFetcherArtifacts = Object.freeze({
  address: "0xb5F4DCB90B13a1E63771fc2cD2a9a6C489c9B637",
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
