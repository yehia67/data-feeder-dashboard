import ApiKeyTable from "@/components/ApiKeyTable";
import OracleFetcher from "@/components/OracleFetcher";
import OracleNftMinter from "@/components/OracleNftMinter";
import OraclePrice from "@/components/OraclePrice";
import { Heading, Container, Flex } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Flex justify="flex-end" m={4}>
        <ConnectButton />
      </Flex>
      <Container>
        <ApiKeyTable />
        <OracleNftMinter />
        <OracleFetcher />
        <OraclePrice />
      </Container>
    </>
  );
};

export default Home;
