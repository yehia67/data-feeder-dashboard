import { BaseOracle } from "./BaseOracle";

export const OraclePokemonArtifacts = Object.freeze({
  address: "0xF177881Ee7ABbb5e737f4c0f8ac69B42C1898068",
  abis: [
    ...BaseOracle.abis,
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "id",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "caller",
          type: "address",
        },
      ],
      name: "OracleRequested",
      type: "event",
    },
    {
      inputs: [],
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
