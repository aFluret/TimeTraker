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
          {isUser ? 'Добавление пользователя' : 'Регистрация админа '}
        </Heading>
        <br />
        <FormControl>
          <FormLabel>ФИО</FormLabel>
          <Text align={"left"}></Text>
          <Input type="text" name="name" onChange={handleChange} />
          <FormLabel>Почта</FormLabel>
          <Text align={"left"}>Используется при входе в учетную запись</Text>
          <Input type="email" name="email" onChange={handleChange} />

          <FormLabel lh="1%">Пароль</FormLabel>
          <Input
            placeholder=" "
            type="password"
            name="password"
            onChange={handleChange}
          />
        </FormControl>
        <Text fontSize={"14px"} align={"left"} mt="1%">
         
        </Text>

        <Button color="white" bg="#3B8FC2" m="auto" mt="5%">
          <Link to="/detail" onClick={handleClick}>
            Следующая
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default SignUp;
