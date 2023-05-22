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

export const getProjects = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let res = await axios.get(url, {
    headers: {
      token: token,
    },
  });
  // console.log("token:", token);
  return res.data;
};

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const url = "http://localhost:8080/projects";
  const navigate = useNavigate();

  const onChange = (e) => {
    // setQuery(e.target.value);
    // console.log(query);
    getProjects(`${url}?q=${e.target.value}`).then((res) => setProjects(res));
  };
  console.log("Porj :", projects);
  {
    /** useEffetcts for component*/
  }
  const onClick = (id) => {
    localStorage.setItem("projectId", id);
  };
  useEffect(() => {
    getProjects(url).then((res) => setProjects(res));
  }, []);

  return (
    <Flex>
      <Sidebar />
      <Box m={"30px"} w="85%">
        <Flex mb={"30px"}>
          <Text fontSize="4xl" fontWeight="500">
            Табели
          </Text>
          <Spacer />
          <Link to="/SignUp" state={{ isUser: true }}>
          </Link>
          <Link to="/projectCreation">
            <Button bg={"#3B8FC2"} color="white">
              <Flex align={"center"}>
                <AddIcon mr="10px" />
                Добавить новый табель
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
                <Th>Код дела</Th>
                <Th>Имя сотрудника</Th>
                <Th>Количество часов</Th>
                <Th>Начато</Th>
                <Th>Закончено</Th>
                <Th>Хз что</Th>
                <Th>Статус</Th>
                <Th>Действие</Th>
              </Tr>
            </Thead>
            <Tbody>
              {projects.map((item) => (
                <Tr key={item._id}>
                  <Td onClick={() => onClick(item._id)}>
                    <Link to="/dashboard/projects/tasks">
                      {item.projectname}
                    </Link>
                  </Td>
                  <Td>{item.clientName}</Td>
                  <Td>{item.hours}</Td>
                  <Td>{item.billingAmount}</Td>
                  <Td>{item.budgetSpent}</Td>
                  <Td>{item.createdOn.slice(4, 16)}</Td>
                  <Td>{item.status ? "Active" : "inActive"}</Td>
                  <Td>
                    <Flex justifyContent={"space-evenly"}>
                      <Image src={pen} w="16px" onClick={()=> navigate('/projectCreation', { state: { id: item._id }})}/>
                      <CopyIcon w="16px" />
                      <Image src={box} />
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
