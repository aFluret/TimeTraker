import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Spacer,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  DownloadIcon,
  ExternalLinkIcon,
  LinkIcon,
} from "@chakra-ui/icons";
import { useDownloadExcel } from 'react-export-table-to-excel';

import axios from "axios";

import Sidebar from "../Components/Sidebar";
import { useRef } from "react";

const getProjects = async (token) => {
  let res = await axios.get("http://localhost:8080/projects", {
    headers: {
      token: token,
    },
  });
  return res.data;
};

export default function Reports() {
  const [totalHours, setTotalHours] = useState(0);
  const [amount, setAmount] = useState(0);
  const [budSpent, setBudSpent] = useState(0);
  const [projects, setProjects] = useState([]);

  let token = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    getProjects(token).then((res) => setProjects(res));
  }, []);
  useEffect(() => {
    projects.map((item) => {
      setTotalHours((prev) => prev + item.hours);
      setAmount((prev) => prev + item.billingAmount);
      setBudSpent((prev) => prev + item.budgetSpent);
    });
  }, [projects]);

  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Отчёт',
    sheet: 'Отчёт 43534534534543'
})

const getStatusColor = (status) => {
  if(status == 'Закрыто') return 	'#880808';
  if(status == 'Активно') return 	'#00FF00';
  if(status == 'Готово') return 	'##FFFF00';
}

  // console.log("tokrn :", token);
  return (
    <>
      <Flex w="100%" h="auto">
        <Sidebar />

        <Box p="1rem" height="auto" w="100%">
          <Flex mb="1rem">
            <Text fontSize="4xl" fontWeight="500">
              Dashboard
            </Text>
            <Spacer />
            <Button mr="1" bg="white" variant="outline" color="#3B8FC2" onClick={onDownload}>
              <Flex align={"center"}>
              Скачать  
                <DownloadIcon mr="10px" />
                {/* <TriangleDownIcon mr="10px" /> */}
              </Flex>
            </Button>
          </Flex>

          <Box w="100%" mt="1%" h="auto">
            <Box w="100%" h="auto">
              <TableContainer>
                <Table variant="simple" size={"md"}  ref={tableRef}>
                  {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
                  <Thead borderBottom={"3px solid lightGray"}>
                    <Tr>
                      <Th>Код дела</Th>
                      <Th>Количество часов</Th>
                      <Th>Понедельник</Th>
                      <Th>Вторник</Th>
                      <Th>Среда</Th>
                      <Th>Четверг</Th>
                      <Th>Пятница</Th>
                      <Th>Статус</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {projects.map((item) => {
                      console.log(item)
                      
                      return (
                      <Tr>
                        <Td>{item.projectname}</Td>
                        <Td>{item.hours.reduce((prev, cur) => prev + Number(cur), 0)}</Td>
                        <Td>{item.hours[0]}</Td>
                        <Td>{item.hours[1]}</Td>
                        <Td>{item.hours[2]}</Td>
                        <Td>{item.hours[3]}</Td>
                        <Td>{item.hours[4]}</Td>
                        <Td backgroundColor={getStatusColor(item.status)}>{item.status}</Td>
                      </Tr>
                    )})}
                  </Tbody>
                </Table>
              </TableContainer>
            </Box>
          </Box>
        </Box>
      </Flex>
    </>
  );
}
