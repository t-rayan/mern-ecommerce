import {
  Box,
  Menu,
  MenuItem,
  MenuList,
  MenuButton,
  Button,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    return <Navigate to="/login" />;
  };

  return (
    <>
      <Box
        px="2rem"
        w="100%"
        h="8vh"
        gridTemplateColumns="auto auto"
        gap="1rem"
        borderBottom="1px"
        borderColor="gray.300"
        display="grid"
        alignItems="center"
        justifyContent="end"
      >
        {!userInfo ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              {userInfo.fullname}
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
    </>
  );
};

export default Navbar;
