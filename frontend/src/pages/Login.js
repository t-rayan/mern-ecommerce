import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alertbox from "../components/Alertbox";
import { reset } from "../features/auth/authSlice";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, message, isSuccess, userInfo } = useSelector(
    (state) => state.auth
  );

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (userInfo && userInfo?.isAdmin) {
      navigate("/dashboard");
    } else if (userInfo) {
      navigate("/");
    }
  }, [isSuccess, userInfo, navigate]);

  return (
    <AuthLayout>
      <Box
        w="28rem"
        border="1px"
        borderColor="gray.300"
        borderRadius="lg"
        p="3rem"
      >
        <VStack mb="3rem">
          <Heading size="md">Login to your account</Heading>
          <Text fontSize=".9rem">
            Don`t have an account ?{" "}
            <Link to="/" color="blue">
              Signup
            </Link>{" "}
          </Text>
        </VStack>

        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack spacing="2rem">
            <FormControl>
              <FormLabel htmlFor="email">Email address</FormLabel>
              <Input
                borderColor="gray.300"
                type="email"
                {...register("email")}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                borderColor="gray.300"
                type="password"
                {...register("password")}
              />
            </FormControl>
            {isError && <Alertbox msg={message} closeFunc={reset} />}
            <Button
              colorScheme="blue"
              size="md"
              w="100%"
              type="submit"
              isLoading={isLoading}
              loadingText="Processing"
            >
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default Login;
