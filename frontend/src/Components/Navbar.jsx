import { Box, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import "./Navbar.css";
function Navbar() {
  return (
    <Box
      className="container"
      boxShadow="md"
      pos="sticky"
      // pos="fixed"
      w="100%"
      // zIndex="100"
      top="0px"
      bg="white"
    >
      <Box>
        <Image
          width="150px" 
         // src="https://img.freepik.com/premium-vector/clock-vector-illustration-on-white-background-office-clock-illustration-countdown-clock-counter-timer-countdown-art-design-eps-10_158224-116.jpg"
           
           src={require('./hours.png')} 
          alt="Logo"
        />
      </Box>
      <Box className="rightside">
       
        <Box>
          <Link to="/SignIn">Вход</Link>
        </Box>
        <Box
          className="navbtn"
          as="button"
          borderRadius="md"
          bg="#3B8FC2"
          color="white"
          px={4}
          py={2}
        >
          <Link to="/SignUp">Регистрация</Link>
        </Box>
      </Box>
    </Box>
  );
}
export default Navbar;
