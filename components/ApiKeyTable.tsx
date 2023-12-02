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
  const [msg, setMsg] = React.useState<string>("Connecting..");

  const { address, isReconnecting } = useAccount();

  // Use a variable to store the message
  let tableContent;

  React.useEffect(() => {
    const setApiInfo = async () => {
      if (!address) {
        setMsg("Please connect your wallet...");
        return;
      }
      const currentApiKeys = await getAccountDetails(address);
      if (!currentApiKeys.length) {
        setMsg("You are not subscribed to any oracle...");
      }
      setApiKeys(currentApiKeys);
    };
    setApiInfo();
  }, [address, isReconnecting]);

  // Conditionally set the tableContent variable
  if (apiKeys.length) {
    tableContent = apiKeys.map((apiKey) => (
      <Tr key={apiKey.id}>
        <Td>{apiKey.key}</Td>
        <Td>{apiKey.type}</Td>
        <Td>{apiKey.usage}</Td>
      </Tr>
    ));
  } else {
    tableContent = (
      <Tr>
        <Td colSpan={3} textAlign="center">
          {msg}
        </Td>
      </Tr>
    );
  }

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
        <Tbody>{tableContent}</Tbody>
      </Table>
    </Container>
  );
};

export default ApiKeyTable;
