import { useEffect } from "react";
import FormLayout from "../layouts/FormLayout";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getCategory,
  updateCategory,
} from "../features/category/categorySlice";
import Alertbox from "../components/Alertbox";
import { reset } from "../features/category/categorySlice";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";

const AddCategory = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const { isError, message, isLoading, isSuccess, isEdit, category } =
    useSelector((state) => state.categories);
  const { register, handleSubmit } = useForm();

  // handling add category
  const onSubmit = (data) => {
    !category && dispatch(addCategory(data));
    category && dispatch(updateCategory({ id, data }));
  };

  useEffect(() => {
    if (id) {
      dispatch(getCategory(id));
    }
  }, [dispatch, id]);

  return (
    <FormLayout title={id ? "Edit Category" : "Add Category"}>
      <Box bg="#e5e5e5" p={10} shadow="lg" w="30rem" borderRadius="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={8}>
            <FormControl>
              <FormLabel htmlFor="cat-name"> Name</FormLabel>
              <Input
                defaultValue={id ? category?.name : ""}
                {...register("name", { required: true })}
                type="text"
                borderColor="gray.400"
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

export default AddCategory;
