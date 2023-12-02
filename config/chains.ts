import { Chain, defineChain } from "viem";

export const toposChain: Chain = defineChain({
  id: 2359,
  network: "homestead",
  name: "Topos",
  nativeCurrency: { name: "Topos", symbol: "TOPOS", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc.topos-subnet.testnet-1.topos.technology"],
    },
    public: {
      http: ["https://rpc.topos-subnet.testnet-1.topos.technology"],
    },
  },
  testnet: true,
});
