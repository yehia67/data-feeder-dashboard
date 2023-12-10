import React from "react";

import { Button, Select, FormControl, FormLabel, Box } from "@chakra-ui/react";
import { OraclePriceArtifacts } from "@/artifacts/OraclePrice";
import { parseEther } from "ethers";
import { getFees } from "@/utils";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import axios from "axios";
import { PopupsProps } from "@/interfaces";

const OraclePrice = ({ openPopup }: PopupsProps) => {
  const [fees, setFees] = React.useState("0");
  const [fiatCurrency, setFiatCurrency] = React.useState("");
  const [cryptoSymbol, setCryptoSymbol] = React.useState("");
  const [availableFiatCurrency, setAvailableFiatCurrency] = React.useState([]);
  const [availableCCSymbol, setAvailableCCSymbol] = React.useState([]);

  const handleRequestOracle = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: OraclePriceArtifacts.address,
        abi: OraclePriceArtifacts.abis,
        functionName: "requestOracle",
        args: [fiatCurrency, cryptoSymbol],
        value: parseEther(fees),
      });
      await writeContract(request);
    } catch (error) {
      if (JSON.stringify(error).includes("Unauthorized")) {
        openPopup();
      }
    }
  };

  React.useEffect(() => {
    const fetchFees = async () => {
      const [currentFees, fiatCurrencyOptions, cryptoSymbolOptions] =
        await Promise.all([
          getFees("OraclePrice"),
          axios.get(
            "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
          ),
          axios.get("https://api.coingecko.com/api/v3/coins/list"),
        ]);
      setFees(currentFees);
      setAvailableFiatCurrency(fiatCurrencyOptions.data);
      setAvailableCCSymbol(
        cryptoSymbolOptions.data.map((coin: { id: string }) => coin.id)
      );
    };
    fetchFees();
  }, []);
  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={4}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <FormControl mb={3}>
        <FormLabel>Currency</FormLabel>
        <Select
          onChange={(e) => setFiatCurrency(e.target.value)}
          placeholder="Select fiat currency"
        >
          {availableFiatCurrency.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl mb={3}>
        <FormLabel>Crypto Symbol</FormLabel>
        <Select
          onChange={(e) => setCryptoSymbol(e.target.value)}
          placeholder="Select crypto symbol"
        >
          {availableCCSymbol.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        colorScheme="blue"
        mb={3}
        width="100%"
        onClick={() => handleRequestOracle()}
      >
        Request Oracle
      </Button>
      <FormLabel textAlign="center">Fee: {fees} TOPOS</FormLabel>
    </Box>
  );
};

export default OraclePrice;
