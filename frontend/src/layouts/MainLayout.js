import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

const MainLayout = ({ children }) => {
  return (
    <Box h="100vh" display="grid" gridTemplateRows="auto 1fr">
      <Navbar />
      <Box>{children}</Box>
    </Box>
  );
};

export default MainLayout;
