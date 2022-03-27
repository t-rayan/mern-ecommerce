import { useEffect } from "react";
import EmptyState from "../components/EmptyState";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Image,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  removeProduct,
  reset,
} from "../features/product/productSlice";
import LoadingState from "../components/LoadingState";
import { FaPlus } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";
import PopMenu from "../components/PopMenu";

const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : products?.length === 0 ? (
        <EmptyState title="Products" goto={() => navigate("add")} />
      ) : (
        <Stack spacing="10">
          {/* header */}
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Heading size="md">Products</Heading>
            <Button
              size="sm"
              colorScheme="teal"
              leftIcon={<FaPlus />}
              borderRadius="full"
              onClick={() => navigate("add")}
            >
              Add
            </Button>
          </Flex>
          {/* search input */}
          <Box>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input type="text" placeholder="Search" borderColor="gray.300" />
            </InputGroup>
          </Box>
          {/* content table */}
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>REMAINING</Th>
                <Th>PRICE</Th>
                <Th>OPTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products?.map((product) => (
                <Tr key={product._id}>
                  <Td display="flex" alignItems="center" gap={2}>
                    <Box>
                      <Image
                        src={product?.img}
                        alt="pimg"
                        boxSize="50px"
                        borderRadius="md"
                      />
                    </Box>
                    {product.name}
                  </Td>
                  <Td>{product.inventory}</Td>
                  <Td>{product.price}</Td>
                  <Td>
                    <PopMenu
                      deleteFunc={() => dispatch(removeProduct(product._id))}
                      editFunc={() => {
                        navigate(product._id);
                        dispatch(reset());
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Stack>
      )}
    </>
  );
};

export default Products;
