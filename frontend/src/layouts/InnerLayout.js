import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { Outlet } from "react-router-dom";

const InnerLayout = ({ children, title }) => {
  return (
    <Box h="100%">
      <Outlet />
    </Box>
  );
};

export default InnerLayout;
