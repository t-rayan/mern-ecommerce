import { Box, Button, Heading, Stack, VStack } from "@chakra-ui/react";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const FormLayout = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <Stack spacing={10}>
      <Box>
        <Button
          variant="link"
          leftIcon={<FaArrowLeft w={5} h={5} />}
          _hover={{ outline: "none" }}
          _focus={{ outline: "none" }}
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Box>
      <Box>
        <Heading size="sm">{title}</Heading>
      </Box>
      <Box>{children}</Box>
    </Stack>
  );
};

export default FormLayout;
