import { BaseOracle } from "./BaseOracle";

export const OracleFetcherArtifacts = Object.freeze({
  address: "0x1B6F71B2Bae5FCEE6Cc68A228e3B4549927Ad80B",
  abis: [
    ...BaseOracle.abis,
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
