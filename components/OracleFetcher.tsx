import React from "react";

import { getFees } from "@/utils";
import { Button, Input, FormControl, FormLabel, Box } from "@chakra-ui/react";
import { prepareWriteContract, writeContract } from "wagmi/actions";
import { OracleFetcherArtifacts } from "@/artifacts/OracleFetcher";
import { parseEther } from "ethers";
import { PopupsProps } from "@/interfaces";

const OracleFetcher = ({ openPopup }: PopupsProps) => {
  const handleRequestOracle = async () => {
    try {
      const { request } = await prepareWriteContract({
        address: OracleFetcherArtifacts.address,
        abi: OracleFetcherArtifacts.abis,
        functionName: "requestOracle",
        args: [httpUrl],
        value: parseEther(fees),
      });
      await writeContract(request);
    } catch (error) {
      if (JSON.stringify(error).includes("Unauthorized")) {
        openPopup();
      }
    }
  };
  const [fees, setFees] = React.useState("0");
  const [httpUrl, setHttpUrl] = React.useState("");

  React.useEffect(() => {
    const fetchFees = async () => {
      const currentFees = await getFees("OracleFetcher");
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
      boxShadow="lg"
    >
      <FormControl mb={2}>
        <FormLabel>HTTP URL</FormLabel>
        <Input
          type="text"
          placeholder="Enter HTTP URL"
          value={httpUrl}
          onChange={(e) => setHttpUrl(e.target.value)}
        />
      </FormControl>
      <Button
        colorScheme="teal"
        onClick={handleRequestOracle}
        mb={2}
        width="100%"
      >
        Request Oracle
      </Button>
      <FormLabel textAlign="center">Fee: {fees} TOPOS</FormLabel>
    </Box>
  );
};

export default OracleFetcher;
