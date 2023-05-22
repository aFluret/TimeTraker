import {
  Box,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  FormLabel,
  Button,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const getUsers = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return await axios.get("http://localhost:8080/company/", {
    headers: {
      token: token,
    },
  });
};


export const getProjects = async (url) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let res = await axios.get(url, {
    headers: {
      token: token,
    },
  });
  return res.data;
};

function ProjectEdit({ location }) {
  let token = JSON.parse(localStorage.getItem("token"));
  const [users, setUsers] = useState([]);
  const url = "http://localhost:8080/projects";

  const {state = {}} = useLocation();
  const editingId = state?.id;
  
  const initialProject = {
    projectname: "",
    userId: "",
    hours: 0,
    createdON: Date(),
    status: true,
  };

  const [project, setProject] = useState(initialProject);

  useEffect(() => {
    if(editingId){
      getProjects(`http://localhost:8080/projects/${editingId}`).then((project => setProject(project)))
    }
    return () => {};
  }, []);

  useEffect(() => {
    if(project.userId)
    getUsers(project.userId).then(res => {
       setUsers(res?.data)
      });

      return () => {};
   }, [project]);

  const navigate = useNavigate("/dashboard/project");

  const onChange = (e) => {
    const key = e.target?.name;
    if(!key){
      setProject({
        ...project,
        ['status']: e,
      });
      return;
    } else {
      setProject({
        ...project,
        [key]: e.target.value,
      });
    }
  };

  // const setTeam = (e) => {};

  const submit = async () => {
    let res = await axios({
      method: "PATCH",
      headers: {
        token: token,
      },
      url: `http://localhost:8080/projects/${editingId}`,
      data: project,
    }).catch(error => {
      console.log(error);
    });

    // console.log(res.data);
    navigate("/dashboard/projects");
  };

  return (
    <Box w="40%" m={"auto"} mb="100px">
      <Text mb="20px" fontSize="5xl">
        Add Projects
      </Text>
      <Stack gap={"20px"}>
        <Box>
          <FormLabel>Project Name</FormLabel>
          <Input
            name="projectname"
            placeholder="Project Name"
            onChange={onChange}
            value={project?.projectname}
          />
        </Box>

        <Box>
        <FormLabel>Project Name</FormLabel>
        <Select
            mb="1%"
            bgColor={"#dceefa"}
            onChange={onChange}
            key={'userId'}
            name="userId"
            value={project?.userId}
          >
            {users.map(item => {
              return ( <option value={item._id}>{item.name}</option>)
            })}
          </Select>
        </Box>
        <Box>
          <Text fontSize="3xl">Billable settings</Text>
          <RadioGroup
            name="billing"
            onChange={onChange}
            key={"status"}
            value={project.status}
          >
            <Stack gap={"20px"}>
              <Radio value="Активно" key={"status"}>
                <Box ml="20px">
                  <Text>
                  { "Активно"}
                  </Text>
                </Box>
              </Radio>

              <Radio value="Готово" key={"status"}>
                <Box ml="20px">
                  <Text>
                  Готово
                  </Text>
                </Box>
              </Radio>

              <Radio value="Закрыто" key={"status"}>
                <Box ml="20px">
                  <Text>
                    Закрыто
                  </Text>
                </Box>
              </Radio>
            </Stack>
          </RadioGroup>
        </Box>
        <Button w="15%" onClick={submit} colorScheme={"teal"}>
          Create Project
        </Button>
      </Stack>
    </Box>
  );
}

export default ProjectEdit;
