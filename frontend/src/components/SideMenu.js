import { Box } from "@chakra-ui/react";
import React from "react";
import SidemenuItem from "./SidemenuItem";
import {
  FaBoxes,
  FaArchive,
  FaCoins,
  FaCog,
  FaUserFriends,
} from "react-icons/fa";

const SideMenu = () => {
  return (
    <Box h="100%" borderRight="1px" borderRightColor="gray.300" p={5}>
      <SidemenuItem
        menuTitle="Categories"
        linkIcon={FaArchive}
        place="categories"
      />
      <SidemenuItem menuTitle="Products" linkIcon={FaBoxes} place="products" />
      <SidemenuItem menuTitle="Orders" linkIcon={FaCoins} place="orders" />
      <SidemenuItem
        menuTitle="Customers"
        linkIcon={FaUserFriends}
        place="customers"
      />

      <SidemenuItem menuTitle="Settings" linkIcon={FaCog} place="settings" />
    </Box>
  );
};

export default SideMenu;
