import ApiKeyTable from "@/components/ApiKeyTable";
import OracleFetcher from "@/components/OracleFetcher";
import OracleNftMinter from "@/components/OracleNftMinter";
import OraclePrice from "@/components/OraclePrice";
import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Flex direction="column" align="center" p={4}>
      <ConnectButton />

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4} width="100%">
        <GridItem colSpan={1}>
          <ApiKeyTable />
        </GridItem>
        <GridItem colSpan={1}>
          <OracleNftMinter />
          <OracleFetcher />
          <OraclePrice />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Home;
