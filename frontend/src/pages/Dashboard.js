import { Box, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { isSuccess } = useSelector((state) => state.auth);
  const toast = useToast();

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Login successful",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    }
  }, [toast, isSuccess]);

  return (
    <Box w="100%">
      <p>Hello world</p>
    </Box>
  );
};

export default Dashboard;
