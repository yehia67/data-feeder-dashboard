import React from "react";
import { NextPage } from "next";

import { Flex, Grid, GridItem } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import ApiKeyTable from "@/components/ApiKeyTable";
import OracleFetcher from "@/components/OracleFetcher";
import OracleNftMinter from "@/components/OracleNftMinter";
import OraclePrice from "@/components/OraclePrice";
import WhitelistErrorPopup from "@/components/WhitelistErrorPopup";

const Home: NextPage = () => {
  const [isPopupOpen, setPopupOpen] = React.useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };
  return (
    <Flex direction="column" align="center" p={4}>
      <ConnectButton />

      <Grid templateColumns="repeat(2, 1fr)" gap={4} mt={4} width="100%">
        <GridItem colSpan={1}>
          <ApiKeyTable />
        </GridItem>
        <GridItem colSpan={1}>
          <OracleNftMinter openPopup={openPopup} closePopup={closePopup} />
          <OracleFetcher openPopup={openPopup} closePopup={closePopup}/>
          <OraclePrice openPopup={openPopup} closePopup={closePopup} />
          <WhitelistErrorPopup isOpen={isPopupOpen} onClose={closePopup} />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default Home;
