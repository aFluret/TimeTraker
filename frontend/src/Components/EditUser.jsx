import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { EditUserQuery, SignUp } from "./auth/auth.action";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";

export const getUsers = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return await axios.get("http://localhost:8080/company/", {
    headers: {
      token: token,
    },
  });
};

function EditUser() {
  const maindata = useContext(AuthContext);
  const {state} = useLocation();
  const dispatch = useDispatch();
  let isUser = state?.isUser;
  let email = state?.email;

  const [data, setData] = useState({isUser});

   
  useEffect(() => {
    getUsers().then(res => {
      setData(res?.data.find((item) => item.email == email))
      });
   }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleDetailChange = (e) => {
    const { name, value, type } = e.target;

    const val = (type === 'number') ? +value : value;
    setData({...data,[name]:value})    
  };

  const handleDetailClick = () => {
    dispatch(EditUserQuery(data));   
  };


  return (
    <Container>
      <Box mt="150px" p="30px" pt="50px" boxShadow="lg">
        <Image
          align={"left"}
          w="200px"
        //  src="https://img.freepik.com/premium-vector/clock-vector-illustration-on-white-background-office-clock-illustration-countdown-clock-counter-timer-countdown-art-design-eps-10_158224-116.jpg"
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
          <Input type="text" name="name" onChange={handleChange} value={data?.name} />
          <FormLabel>Email</FormLabel>
          <Text align={"left"}>You will use this email to login</Text>
          <Input type="email" name="email" onChange={handleChange}  value={data?.email} />

          <FormLabel lh="1%">Password</FormLabel>
          <Input
            placeholder=" Set Password"
            type="password"
            name="password"
            onChange={handleChange}
            value={data?.password}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Должность</FormLabel>
          <Select
            mb="1%"
            bgColor={"#dceefa"}
            onChange={handleDetailChange}
            name="job"
            value={data?.job}
          >
            <option>Выберите должность</option>
            <option value="Инспектор">Инспектор</option>
            <option value="Экономист">Экономист</option>
            <option value="Бухгалтер">Бухгалтер</option>
          </Select>

          
        </FormControl>

        <FormLabel mt="1%">Номер телефона</FormLabel>

        <Input
          type="number"
          onChange={handleDetailChange}
          placeholder=""
          name="mobileNumber"
          value={data?.mobileNumber}
        />

        <Button color="white" bg="#3B8FC2" m="auto" mt="5%">
          <Link to={'/dashboard/users'} onClick={handleDetailClick}>
            Create New Company
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default EditUser;
