import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React from "react";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alertbox from "../components/Alertbox";
import { useSelector } from "react-redux";
import { reset } from "../features/product/productSlice";

const AddProduct = () => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams;
  const { isError, message, isLoading, isEdit } = useSelector(
    (state) => state.products
  );

  const onSubmit = (data) => {
    let file = data?.img[0];
    data.img = file;
    console.log(data);
  };

  return (
    <FormLayout title={id ? "Edit Product" : "Add Product"}>
      <Box
        p={10}
        shadow="lg"
        w="30rem"
        borderRadius="md"
        border="1px"
        borderColor="gray.300"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8}>
            <FormControl>
              <FormLabel htmlFor="cat-name"> Name</FormLabel>
              <Input
                {...register("name", { required: true })}
                type="text"
                borderColor="gray.400"
              />
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Inventory</FormLabel>
                <Input
                  {...register("inventory", { required: true })}
                  type="number"
                  borderColor="gray.400"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Price</FormLabel>
                <Input
                  {...register("price", { required: true })}
                  type="number"
                  borderColor="gray.400"
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Size</FormLabel>
                <Input
                  {...register("size", { required: true })}
                  type="text"
                  borderColor="gray.400"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Color</FormLabel>
                <Input
                  {...register("color", { required: true })}
                  type="text"
                  borderColor="gray.400"
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel htmlFor="cat-name"> Desc</FormLabel>
              <Textarea
                {...register("desc", { required: true })}
                type="text"
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cat-name"> Img</FormLabel>
              <Input
                {...register("img", { required: true })}
                type="file"
                accept=".png, .jpg, .jpeg"
              />
            </FormControl>

            {isError && <Alertbox msg={message} closeFunc={reset} />}

            <Button
              mt="1.5rem"
              w="100%"
              size="lg"
              colorScheme="teal"
              fontSize=".9rem"
              type="submit"
              isLoading={isLoading && isEdit ? false : isLoading ? true : false}
              loadingText="Saving"
            >
              Save Changes
            </Button>
          </Stack>
        </form>
      </Box>
    </FormLayout>
  );
};

export default AddProduct;
