import { useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Home = () => {
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
    <div>
      <p>Home page</p>
    </div>
  );
};

export default Home;
