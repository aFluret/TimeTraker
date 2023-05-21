import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { SignUp } from "./auth/auth.action";
import { AuthContext } from "./AuthContext";

function DetailPage() {
  const maindata = useContext(AuthContext);
  const dispatch = useDispatch();
  console.log(maindata);
  const [data, setData] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    const val = (type === 'number') ? +value : value;
    setData({...data,[name]:val})    
  };

  const handleClick = () => {
    maindata.isAuthData = {
      ...maindata.isAuthData,

      job: data.job,
      mobileNumber: data.mobileNumber,
    };
    // console.log(maindata.isAuthData);
    dispatch(SignUp(maindata.isAuthData));   
  };

  return (
    <Container>
      <Box mt="150px" p="30px" pt="50px" boxShadow="lg">
        <Image
          align={"left"}
          w="200px"
          src="https://img.freepik.com/premium-vector/clock-vector-illustration-on-white-background-office-clock-illustration-countdown-clock-counter-timer-countdown-art-design-eps-10_158224-116.jpg"
          alt="company logo"
        />
        <br />
        <Heading as="h3" size="lg" fontWeight={"600"} align={"left"}>
          Детали сотрудника
        </Heading>
        <br />
        <FormControl>
          <FormLabel>Должность</FormLabel>
          <Select
            mb="1%"
            bgColor={"#dceefa"}
            onChange={handleChange}
            name="job"
          >
            <option>Выберите должность</option>
            <option value="Инспектор">Инспектор</option>
            <option value="Экономист">Экономист</option>
            <option value="Бухгалтер">Бухгалтер</option>
          </Select>

          
        </FormControl>

        <FormLabel mt="1%">MOBILE NUMBER (OPTIONAL)</FormLabel>

        <Input
          type="number"
          onChange={handleChange}
          placeholder="Enter mobile"
          name="mobileNumber"
        />

        <Button color="white" bg="#3B8FC2" m="auto" mt="5%">
          <Link to="/" onClick={handleClick}>
            Create New Company
          </Link>
        </Button>
      </Box>
    </Container>
  );
}

export default DetailPage;

// name: { type: String, required: true },
// email: { type: String, required: true, unique: true },
// password: { type: String, required: true ,  },
// companyName:{type:String , required:true},
// country:{type:String ,required:true },
// companySize:{type:Number , required:true},
// mobileNumber:{type:Number}

// company_name
// :
// "dfvdfv"
// country
// :
// "USA"
// email
// :
// "vcfv"
// employee
// :
// "5"
// name
// :
// "fvdf"
// number
// :
// "42421"
// password
// :
// "fvfv"
