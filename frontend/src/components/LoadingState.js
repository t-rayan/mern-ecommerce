import { Box, Spinner } from "@chakra-ui/react";
import React from "react";

const LoadingState = () => {
  return (
    <Box minH="100%" display="grid" placeItems="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    </Box>
  );
};

export default LoadingState;
