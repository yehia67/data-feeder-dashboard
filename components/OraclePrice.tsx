import { getFees, oraclePriceContract, provider } from "@/utils";
import React from "react";

import { Button, Select, FormControl, FormLabel, Box } from "@chakra-ui/react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
} from "wagmi";
import { OraclePriceArtifacts } from "@/artifacts/OraclePrice";
import { JsonRpcSigner, parseEther } from "ethers";

const OraclePrice = () => {
  const [fees, setFees] = React.useState("0");
  const [fiatCurrency, setFiatCurrency] = React.useState("");
  const [cryptoSymbol, setCryptoSymbol] = React.useState("");
  const { address } = useAccount();
  const fiatCurrencyOptions = Object.freeze([
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
  ]);
  const cryptoSymbolOptions = Object.freeze([
    "BTC",
    "ETH",
    "XRP",
    "LTC",
    "BCH",
  ]);
  const { data: walletClient } = useWalletClient();

  const { config, error } = usePrepareContractWrite({
    chainId: 2359,
    address: OraclePriceArtifacts.address,
    abi: [
      OraclePriceArtifacts.abis.find((abi) => abi.name === "requestOracle"),
    ],
    args: [fiatCurrency, cryptoSymbol],
    value: parseEther(fees),
    account: address,
    walletClient,
  });
  const { write } = useContractWrite(config);

  const handleRequestOracle = () => {
    if (!address) {
      return;
    }
  };
  React.useEffect(() => {
    const fetchFees = async () => {
      const currentFees = await getFees("OraclePrice");
      setFees(currentFees);
    };
    fetchFees();
  }, []);
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="md"
      maxW="400px"
      mx="auto"
      mt="4"
    >
      <FormControl mb="3">
        <FormLabel>Fiat Currency</FormLabel>
        <Select
          onChange={(e) => setFiatCurrency(e.target.value)}
          placeholder="Select fiat currency"
        >
          {fiatCurrencyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb="3">
        <FormLabel>Crypto Symbol</FormLabel>
        <Select
          onChange={(e) => setCryptoSymbol(e.target.value)}
          placeholder="Select crypto symbol"
        >
          {cryptoSymbolOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button colorScheme="blue" mb="3" onClick={() => handleRequestOracle()}>
        Request Oracle
      </Button>
      <Box>
        <FormLabel>Fee: {fees}TOPOS</FormLabel>
      </Box>
    </Box>
  );
};

export default OraclePrice;
