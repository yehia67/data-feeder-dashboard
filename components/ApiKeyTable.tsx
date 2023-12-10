import { useAccount, useContractEvent } from "wagmi";

import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Container,
  Heading,
} from "@chakra-ui/react";
import { IApiKeyRow } from "@/interfaces/SharedTypes";
import React from "react";
import { getAccountDetails } from "@/utils";
import { OracleFetcherArtifacts } from "@/artifacts/OracleFetcher";
import { OraclePokemonArtifacts } from "@/artifacts/OraclePokemon";
import { OraclePriceArtifacts } from "@/artifacts/OraclePrice";

const ApiKeyTable = () => {
  // Sample data, replace this with your actual data
  const [apiKeys, setApiKeys] = React.useState<IApiKeyRow[]>([]);
  const [isRefetching, setIsRefetching] = React.useState(false);

  const [msg, setMsg] = React.useState<string>("Connecting..");
  const { address, isReconnecting } = useAccount();

  useContractEvent({
    address: OracleFetcherArtifacts.address,
    abi: OracleFetcherArtifacts.abis,
    eventName: "OracleRequested",
    listener() {
      setIsRefetching(!isRefetching);
    },
  });

  useContractEvent({
    address: OraclePriceArtifacts.address,
    abi: OraclePriceArtifacts.abis,
    eventName: "OracleRequested",
    listener() {
      setIsRefetching(!isRefetching);
    },
  });

  useContractEvent({
    address: OraclePokemonArtifacts.address,
    abi: OraclePokemonArtifacts.abis,
    eventName: "OracleRequested",
    listener() {
      setIsRefetching(!isRefetching);
    },
  });

  React.useEffect(() => {
    const setApiInfo = async () => {
      if (!address) {
        setMsg("Please connect your wallet...");
        return;
      }
      const currentApiKeys = await getAccountDetails(address);
      if (!currentApiKeys.length) {
        setMsg("You are not subscribed to any oracle...");
        setApiKeys([]);
      } else {
        setApiKeys(currentApiKeys);
      }
    };
    setApiInfo();
  }, [address, isReconnecting, isRefetching]);

  return (
    <Container mt={8}>
      <Heading mb={4} textAlign="center">
        API Key Table
      </Heading>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>API Key</Th>
            <Th>Type</Th>
            <Th>Usage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {apiKeys.length ? (
            apiKeys.map((apiKey, index) => (
              <Tr key={`${apiKey.id} - ${index}`}>
                <Td>{apiKey.key}</Td>
                <Td>{apiKey.type}</Td>
                <Td>{apiKey.usage}</Td>
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={3} textAlign="center">
                {msg}
              </Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ApiKeyTable;
