import React from "react";

import { getFees } from "@/utils";
import { Button, Input, FormControl, FormLabel, Box } from "@chakra-ui/react";

const OracleFetcher = () => {
  const handleRequestOracle = () => {
    // Add logic to handle HTTP URL form submission
    return true;
  };
  const [fees, setFees] = React.useState("0");

  React.useEffect(() => {
    const fetchFees = async () => {
      const currentFees = await getFees("OracleFetcher");
      setFees(currentFees);
    };
    fetchFees();
  }, []);
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection="column"
      maxW="400px"
      mx="auto"
      mt="4"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
    >
      <FormControl mb="2">
        <FormLabel>HTTP URL</FormLabel>
        <Input type="text" placeholder="Enter HTTP URL" />
      </FormControl>
      <Button colorScheme="teal" mb="2">
        Request Oracle
      </Button>
      <Box>
        <FormLabel>Fee: {fees}TOPOS</FormLabel>
      </Box>
    </Box>
  );
};

export default OracleFetcher;
