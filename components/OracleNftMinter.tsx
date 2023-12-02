import React from "react";
import { Button, Box, Flex, FormLabel } from "@chakra-ui/react";
import { getFees } from "@/utils";
import { parseEther } from "ethers";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { OraclePokemonArtifacts } from "@/artifacts/OraclePokemon";

const OracleNftMinter: React.FC = () => {
  const handleMintPokemonNFT = async () => {
    const { request } = await prepareWriteContract({
      address: OraclePokemonArtifacts.address,
      abi: OraclePokemonArtifacts.abis,
      functionName: "requestOracle",
      args: [],
      value: parseEther(fees),
    });
    await writeContract(request);
  };
  const [fees, setFees] = React.useState("0");

  React.useEffect(() => {
    const fetchFees = async () => {
      const currentFees = await getFees("OracleNFT");
      setFees(currentFees);
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
      <Flex justify="space-between" align="center" mb={3}>
        <FormLabel>Fee: {fees} TOPOS</FormLabel>
        <Button onClick={handleMintPokemonNFT} colorScheme="green">
          Mint Pokemon NFT
        </Button>
      </Flex>
    </Box>
  );
};

export default OracleNftMinter;
