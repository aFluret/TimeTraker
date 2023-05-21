import { Box, Divider, Input } from "@chakra-ui/react";
import React from "react";
import { Select } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { Button } from "@chakra-ui/react";

import { Alert, AlertIcon } from "@chakra-ui/react";

const getProjectsName = (token) => {
  return axios.get(`http://localhost:8080/projects`, {
    headers: { token: token },
  });
};

const getTaskName = (projectid) => {
  return axios.get(`http://localhost:8080/tasks`, {
    headers: { projectid: projectid },
  });
};

const updateHours = async (id, hours, token) => {
  let res = await axios({
    method: "PATCH",
    url: `http://localhost:8080/projects/${id}`,
    headers: { token: token },
    data: { hours: hours },
  });
  return res;
};

const getProject = async (id, token) => {
  let res = await axios({
    method: "GET",
    url: `http://localhost:8080/projects/${id}`,
    headers: {
      token: token,
    },
  });
  // console.log("project:", res.data);
  return res.data;
};

export default function HoursForm({ handleHours, i, hours }) {
  const [projectNames, setProjectNames] = useState([]);
  const [taskNames, setTaskNames] = useState([]);
  const [token, setToken] = useState(null);

  const [selectProjectInd, setSelectProjectInd] = useState(null);
  const [projectid, setProjectid] = useState(null);
  
  let [alert, setAlert] = useState(false);
  let [isError, setIsError] = useState(false);
  let [budgetSpent, setBudgetSpent] = useState(0);

  let handleGetName = () => {
    let token = JSON.parse(localStorage.getItem("token"));
    setToken(token);

    getProjectsName(token)
      .then((res) => {
        // console.log(res.data);
        setProjectNames(res.data);
        let tempProjects = res.data;

        let oneItem = tempProjects.find((elem, ind) => ind == selectProjectInd);

        let projectid = oneItem._id;
        // console.log("projectid-->", projectid);
        setProjectid(projectid);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDayHoursFabric = (index) => (value = 0) => {
    hours[index] = value;
    handleHours([...hours]);
  }

  const handleUpdateHours = () => {
    updateHours(projectid, hours, token)
      .then((res) => {
        // console.log("updated project-->",res.data);
        setAlert(true);
        setTimeout(() => {
          setAlert(false);
        }, 3000);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
        setTimeout(() => {
          setIsError(false);
        }, 3000);
      });
  };

  return (
    <div>
      <Box mt={2} display="flex" fontFamily="sans-serif" width="99.50%">
        <Select
          onClick={handleGetName}
          onChange={(e) => setSelectProjectInd(e.target.value)}
          width="26%"
          h="35px"
          fontFamily="mono"
          placeholder="Select/create a project..."
        >
          {projectNames &&
            projectNames.map((name, ind) => (
              <option value={ind}>
                {name.projectname} - {name.projectname}
              </option>
            ))}
        </Select>

        <Input
          onChange={(e) => handleDayHoursFabric(0)(e.target.value)}
          width="8%"
          ml="13px"
          h="35px"
          placeholder="hh"
        />

        <Input
          onChange={(e) =>  handleDayHoursFabric(1)(e.target.value)}
          width="8%"
          ml="13px"
          h="35px"
          placeholder="hh"
        />
        <Input
          onChange={(e) =>  handleDayHoursFabric(2)(e.target.value)}
          width="8%"
          ml="8px"
          h="35px"
          placeholder="hh"
        />
        <Input
          onChange={(e) =>  handleDayHoursFabric(3)(e.target.value)}
          width="8%"
          ml="8px"
          h="35px"
          placeholder="hh"
        />
        <Input
          onChange={(e) =>  handleDayHoursFabric(4)(e.target.value)}
          width="8%"
          ml="9px"
          h="35px"
          placeholder="hh"
        />

        <Button
          onClick={handleUpdateHours}
          ml="49px"
          colorScheme="teal"
          size="md"
        >
          Update
        </Button>
      </Box>
      <Divider borderColor="gray" mt={2} width="99.50%" />
      {alert ? (
        <Alert status="success">
          <AlertIcon />
          Timesheet Updated
        </Alert>
      ) : (
        ""
      )}
      {isError ? (
        <Alert status="error">
          <AlertIcon />
          Timesheet Not Updated
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
}
