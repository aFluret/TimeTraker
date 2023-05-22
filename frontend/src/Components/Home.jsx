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
          Учет 
          </Box>
          табелей,
          <Box as="span" fontWeight="600" ml="1%">
          отслеживание  	&#160;
          </Box>
           времени и
          <Box as="span" fontWeight="600" ml="1%" mr="1%">
            отчет о
          </Box>
          вашей работе.
        </Text>
        <br />
        <Text fontSize="28px" m="auto" align="center">
        Отслеживайте свое рабочее время и создавайте отчеты.
        Все в одном  программном обеспечении для учета рабочего времени..{" "}
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
