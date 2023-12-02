import { BaseOracle } from "./BaseOracle";

export const OraclePokemonArtifacts = Object.freeze({
  address: "0x229D068d763018B92E25107A49D61882eEa48898",
  abis: [
    ...BaseOracle.abis,
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
