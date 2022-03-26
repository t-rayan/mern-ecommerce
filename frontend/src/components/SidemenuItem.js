import { Box, HStack, Icon } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const SidemenuItem = ({ menuTitle, linkIcon, place }) => {
  return (
    <HStack
      px={5}
      py={2}
      borderRadius="md"
      mb={5}
      _hover={{ backgroundColor: "#ddd" }}
    >
      <Icon as={linkIcon} />
      <Link to={`${place}`}>{menuTitle}</Link>
    </HStack>
  );
};

export default SidemenuItem;
