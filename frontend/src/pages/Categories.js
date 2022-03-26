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
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { SearchIcon } from "@chakra-ui/icons";

import PopMenu from "../components/PopMenu";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCategories,
  removeCategory,
  reset,
  filterCategory,
} from "../features/category/categorySlice";
import LoadingState from "../components/LoadingState";

const Categories = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories, isLoading } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <LoadingState />
      ) : categories.length === 0 ? (
        <EmptyState title="Categories" goto={() => navigate("add")} />
      ) : (
        <Stack spacing="10">
          {/* header */}
          <Flex justifyContent="space-between" alignItems="flex-end">
            <Heading size="md">Categories</Heading>
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
              <Input
                type="text"
                placeholder="Search"
                borderColor="gray.300"
                onChange={(e) => dispatch(filterCategory(e.target.value))}
              />
            </InputGroup>
          </Box>
          {/* content table */}
          <Table variant="simple" size="sm">
            <Thead>
              <Tr>
                <Th>NAME</Th>
                <Th>OPTIONS</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categories?.map((cat) => (
                <Tr key={cat._id}>
                  <Td>{cat.name}</Td>
                  <Td>
                    <PopMenu
                      deleteFunc={() => dispatch(removeCategory(cat._id))}
                      editFunc={() => {
                        navigate(cat._id);
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

export default Categories;
