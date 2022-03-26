import { Box, Grid, GridItem } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideMenu from "../components/SideMenu";

const AdminLayout = ({ children }) => {
  return (
    <Grid h="100%" gridTemplateColumns="15rem 1fr">
      <SideMenu />
      <Box p={5} width="85%" maxW="1280px" mx="auto">
        <Outlet />
      </Box>
    </Grid>
  );
};

export default AdminLayout;
