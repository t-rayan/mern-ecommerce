import { Box, Grid } from "@chakra-ui/react";
import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <Grid h="100%" placeItems="center">
      {children}
    </Grid>
  );
};

export default AuthLayout;
