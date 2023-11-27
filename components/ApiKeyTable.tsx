import { useAccount } from "wagmi";
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

const ApiKeyTable = () => {
  // Sample data, replace this with your actual data
  const [apiKeys, setApiKeys] = React.useState<IApiKeyRow[]>([]);
  const { address } = useAccount();
  React.useEffect(() => {
    const setApiInfo = async () => {
      if (!address) return;
      const currentApiKeys = await getAccountDetails(address);
      setApiKeys(currentApiKeys);
    };
    setApiInfo();
  }, [address]); // Include any dependencies for your API key fetching logic
  return (
    <Container>
      <Heading mb={4}>API Key Table</Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>API Key</Th>
            <Th>Type</Th>
            <Th>Usage</Th>
          </Tr>
        </Thead>
        <Tbody>
          {apiKeys.length
            ? apiKeys.map((apiKey) => (
                <Tr key={apiKey.id}>
                  <Td>{apiKey.key}</Td>
                  <Td>{apiKey.type}</Td>
                  <Td>{apiKey.usage}</Td>
                </Tr>
              ))
            : address
            ? "You are not subscribed to any oracle..."
            : "Please connect your wallet..."}
        </Tbody>
      </Table>
    </Container>
  );
};

export default ApiKeyTable;
