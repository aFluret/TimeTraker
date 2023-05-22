import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";

function SignUp() {
  const maindata = useContext(AuthContext);
  const {state} = useLocation();
  let isUser = state?.isUser;

  const [data, setData] = useState({...maindata.isAuthData, isUser});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleClick = () => {
    maindata.setisAuthData(data);
  };
  return (
    <Container>
      <Box mt="150px" p="30px" pt="50px" boxShadow="lg">
        <Image
          align={"left"}
          w="200px"
          //src="https://img.freepik.com/premium-vector/clock-vector-illustration-on-white-background-office-clock-illustration-countdown-clock-counter-timer-countdown-art-design-eps-10_158224-116.jpg"
          src={require('./hours.png')} 
          alt="company logo"
        />
        <br />
        <Heading as="h3" size="lg" fontWeight={"600"} align={"left"}>
          {isUser ? 'Регистрация пользователя' : 'Регистрация админа '}
        </Heading>
        <br />
        <FormControl>
          <FormLabel>Full Name</FormLabel>
          <Text align={"left"}>So we know what to call you in the app</Text>
          <Input type="text" name="name" onChange={handleChange} />
          <FormLabel>Email</FormLabel>
          <Text align={"left"}>You will use this email to login</Text>
          <Input type="email" name="email" onChange={handleChange} />

          <FormLabel lh="1%">Password</FormLabel>
          <Input
            placeholder=" Set Password"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </FormControl>
        <Text fontSize={"14px"} align={"left"} mt="1%">
          By Signing up you agree to the Tearms of use
        </Text>

        <Button color="white" bg="#3B8FC2" m="auto" mt="5%">
          <Link to="/detail" onClick={handleClick}>
            Next
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;
