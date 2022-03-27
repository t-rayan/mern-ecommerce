import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Stack,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { useEffect } from "react";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alertbox from "../components/Alertbox";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, reset } from "../features/product/productSlice";
import { addProduct } from "../features/product/productSlice";
import { getAllCategories } from "../features/category/categorySlice";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();

  const { isError, message, isLoading, isEdit, product } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("inventory", data.inventory);
    formData.append("price", data.price);
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("desc", data.desc);
    formData.append("category", data.category);
    formData.append("pic", data.pic[0]);
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    dispatch(getAllCategories());
    id && dispatch(getProduct(id));
  }, [dispatch, id]);

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
                defaultValue={id ? product?.name : " "}
                {...register("name")}
                type="text"
                borderColor="gray.400"
              />
            </FormControl>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Inventory</FormLabel>
                <Input
                  defaultValue={id ? product?.inventory : " "}
                  {...register("inventory")}
                  type="number"
                  borderColor="gray.400"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Price</FormLabel>
                <Input
                  defaultValue={id ? product?.price : " "}
                  {...register("price")}
                  type="number"
                  borderColor="gray.400"
                />
              </FormControl>
            </HStack>
            <HStack>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Size</FormLabel>
                <Input
                  defaultValue={id ? product?.size : " "}
                  {...register("size")}
                  type="text"
                  borderColor="gray.400"
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="cat-name"> Color</FormLabel>
                <Input
                  defaultValue={id ? product?.color : " "}
                  {...register("color")}
                  type="text"
                  borderColor="gray.400"
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel htmlFor="product-cat"> Category </FormLabel>
              <Select {...register("category")} placeholder="Select option">
                {categories?.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cat-name"> Desc</FormLabel>
              <Textarea
                defaultValue={id ? product?.desc : " "}
                {...register("desc")}
                type="text"
                borderColor="gray.400"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cat-name"> Img</FormLabel>
              <Input {...register("pic")} type="file" />
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
