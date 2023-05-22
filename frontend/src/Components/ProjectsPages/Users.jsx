import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Input,
  Select,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import {
  AddIcon,
  DownloadIcon,
  HamburgerIcon,
  CopyIcon,
} from "@chakra-ui/icons";
import inbox from "./Assets/inbox.png";
import pen from "./Assets/pen.png";
import box from "./Assets/cardboard-box.png";
import axios from "axios";
// import sidebar from "../Sidebar";
import Sidebar from "../Sidebar";
import { useContext } from "react";
import { AppContext } from "../../context/Appcontext";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../auth/auth.action";

export const getUsers = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return await axios.get("http://localhost:8080/company/", {
    headers: {
      token: token,
    },
  });
};

export default function Users() {
  const [users, setUsers] = useState([]);
  const url = "http://localhost:8080/projects";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [action, setAction] = useState(0)

  const onChange = (e) => {
    getUsers(`${url}`).then((res) => setUsers(res));
  };
  console.log("Porj :", users);
 
  useEffect(() => {
   getUsers().then(res => {
      setUsers(res?.data)
     });
  }, [action]);

  const handleDelete = (id) => {
    dispatch(DeleteUser(id));
    setAction(action+1);
    alert("Пользователь удален!")
  }

  return (
    <Flex>
      <Sidebar />
      <Box m={"30px"} w="85%">
        <Flex mb={"30px"}>
          <Text fontSize="4xl" fontWeight="500">
            Сотрудники
          </Text>
          <Spacer />
          <Link to="/SignUp" state={{ isUser: true }}>
            <Button bg={"#3B8FC2"} color="white">
              <Flex align={"center"}>
                <AddIcon mr="10px" />
                Добавить нового сотрудника
              </Flex>
            </Button>
    
      
          </Link>
        </Flex>
        <Flex align={"center"}>
          <Input
            w="15%"
            placeholder="Поиск"
            onChange={onChange}
          />
          <Button ml={"20px"} border="1px solid lightGray" bg="transparent">
            <Image src={inbox} w="20px" />
            <Select border={"none"}>
              <option value="all">Все</option>
              {/* <option value="archived">Archived</option>
              <option value="active">Active</option> */}
            </Select>
          </Button> 
          <Spacer />
          {/* <Box mr={"20px"} color={"blue"}>
            <DownloadIcon />
            Export
          </Box> */}
          {/* <Flex align={"center"} color={"blue"}>
            <HamburgerIcon />
            Group by:
            <Select w={"20%"} border="none">
              <option value="none">None</option>
              <option value="client">Client</option>
            </Select>
          </Flex> */}
        </Flex>
        <TableContainer>
          <Table variant="simple" size={"md"}>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead borderBottom={"1px solid lightGray"}>
              <Tr>
                <Th>ФИО</Th>
                <Th>Почта</Th>
                <Th>Должность</Th>
                <Th>Пользователь</Th>
                <Th>Номер телефона</Th>
                <Th>Действие</Th>
              </Tr>
            </Thead>
            <Tbody>
              { users?.map((item) => (
                <Tr key={item._id}>
                  <Td>{item?.name}</Td>
                  <Td>{item?.email}</Td>
                  <Td>{item?.job}</Td>
                  <Td>{item?.isUser}</Td>
                  <Td>{item?.mobileNumber}</Td>
                  <Td>
                    <Flex justifyContent={"space-evenly"}>
                      <Image src={pen} w="16px" onClick={()=> navigate('/dashboard/editUser', { state: { email: item.email, isUser: true }})}/>
                      <CopyIcon w="16px" />
                      <Image src={box} onClick={()=> handleDelete(item._id)}/>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Flex>
  );
}
