import { Box, Text, Image, SimpleGrid, Heading } from "@chakra-ui/react";
import Footer from "./Footer";
import "./Home.css";
import MobileNav from "./mobileNav";
import Navbar from "./Navbar";
function Home() {
  return (
    <>
    <Navbar/>
    <Box as="main" mt="250px">
      <Box px="60px" border="3px" borderColor="blue">
        <Text
          fontSize={[30,35,40,85]}
          width="80%"
          align="center"
          m="auto"
          fontWeight="200"
          mt="60px"
        >
          <Box as="span" fontWeight="600" ml="1%" mr="1%">
            Organize
          </Box>
          projexts,
          <Box as="span" fontWeight="600" ml="1%">
            Track
          </Box>
          time and
          <Box as="span" fontWeight="600" ml="1%" mr="1%">
            Report
          </Box>
          you work.
        </Text>
        <br />
        <Text fontSize="28px" m="auto" align="center">
          Coordinate projects and tasks. Track your work hours and create
          awesome-looking reports for clients.{" "}
          <Box as="span" fontWeight="600" color="#375D75">
            All-in-one free time tracking software.
          </Box>
        </Text>

       
      </Box>
      {/* <Footer/> */}
    </Box>
    </>
  );
}
export default Home;
