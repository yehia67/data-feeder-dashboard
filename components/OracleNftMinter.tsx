import React from "react";
import { Button, Box, Flex, FormLabel } from "@chakra-ui/react";
import { getFees } from "@/utils";

const OracleNftMinter: React.FC = () => {
  const handleMintPokemonNFT = () => {
    // Add logic to handle Pokemon NFT form submission
    return true;
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
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p="4"
      boxShadow="md"
      maxW="400px"
      mx="auto"
      mt="4"
    >
      <Flex justify="space-between" align="center" mb="3">
        <FormLabel>Fee: {fees}TOPOS</FormLabel>
        <Button colorScheme="green">Mint Pokemon NFT</Button>
      </Flex>
    </Box>
  );
};

export default OracleNftMinter;
