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
  Text,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import FormLayout from "../layouts/FormLayout";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Alertbox from "../components/Alertbox";
import { useSelector, useDispatch } from "react-redux";
import {
  getProduct,
  reset,
  updateProduct,
} from "../features/product/productSlice";
import { addProduct } from "../features/product/productSlice";
import { getAllCategories } from "../features/category/categorySlice";

const AddProduct = () => {
  const fileRef = useRef();
  const multiFileRef = useRef();

  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState("No image selected");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const { id } = useParams();

  const { isError, message, isLoading, isEdit, product } = useSelector(
    (state) => state.products
  );
  const { categories } = useSelector((state) => state.categories);

  const productData = (data) => {
    const imgFiles = multiFileRef.current.files
      ? multiFileRef.current.files
      : null;
    console.log(fileRef.current.files[0]);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("inventory", data.inventory);
    formData.append("price", data.price);
    formData.append("size", data.size);
    formData.append("color", data.color);
    formData.append("desc", data.desc);
    formData.append("category", data.category);
    formData.append("pic", fileRef.current.files[0]);

    for (let i = 0; i < imgFiles.length; i++) {
      formData.append("imgs", imgFiles[i]);
    }
    return formData;
  };

  const onSubmit = async (data) => {
    const formData = productData(data);

    !id && dispatch(addProduct(formData));
    id && product && dispatch(updateProduct({ id, formData }));
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
        borderRadius="md"
        width="100%"
        border="1px"
        borderColor="gray.300"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* main form */}
          <Box display="grid" gridTemplateColumns="1fr 1fr" gap="5rem">
            {/* left form controls */}

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
            </Stack>
            {/* right form controls */}

            <Stack spacing={8}>
              {/* single image upload */}
              <FormControl>
                <FormLabel htmlFor="cat-name"> Display Image</FormLabel>
                <Box
                  px={2}
                  py={5}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  display="flex"
                  flexDir="column"
                >
                  <Input
                    {...register("pic")}
                    ref={fileRef}
                    type="file"
                    hidden="hidden"
                    onChange={(e) => setSelected(e.target.files[0].name)}
                  />
                  <Button
                    colorScheme="blue"
                    onClick={(e) => {
                      fileRef.current.click();
                    }}
                  >
                    Browse{" "}
                  </Button>
                  <Text mt={3}>{selected}</Text>
                </Box>
              </FormControl>

              {/* multiple image upload */}
              <FormControl>
                <FormLabel htmlFor="cat-name"> Add More</FormLabel>
                <Box
                  px={2}
                  py={5}
                  border="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  display="flex"
                  flexDir="column"
                >
                  <Input
                    {...register("pic")}
                    ref={multiFileRef}
                    type="file"
                    hidden="hidden"
                    multiple
                    onChange={(e) => setImages([...images, ...e.target.files])}
                  />
                  <Button
                    colorScheme="blue"
                    onClick={(e) => {
                      multiFileRef.current.click();
                    }}
                  >
                    Add More
                  </Button>
                  <Box mt={3}>
                    {images.length > 0
                      ? images.map((im) => <Text key={im.name}>{im.name}</Text>)
                      : "No files selected"}
                  </Box>
                </Box>
              </FormControl>

              {isError && <Alertbox msg={message} closeFunc={reset} />}

              <Button
                mt="1.5rem"
                w="100%"
                size="lg"
                colorScheme="teal"
                fontSize=".9rem"
                type="submit"
                isLoading={
                  isLoading && isEdit ? false : isLoading ? true : false
                }
                loadingText="Saving"
              >
                Save Changes
              </Button>
            </Stack>
          </Box>
        </form>

        {/* multiple images uploading form */}
      </Box>
    </FormLayout>
  );
};

export default AddProduct;
