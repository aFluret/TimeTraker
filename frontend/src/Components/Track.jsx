import React from "react";
import "../styles/Dashboard.css";

import { Box, Button, Text } from "@chakra-ui/react";

import { Divider } from "@chakra-ui/react";
import { useState } from "react";
import HoursForm from "./HoursForm";

export default function Track({ userName }) {

  const [hours, setHours] = useState([0,0,0,0,0]);


  const [formArr, setformArr] = useState([1]);




  return (
    <div className="track">
      <h2 className="track-title">Недельный табель</h2>
      <section className="weeks-area">
        <div className="track-dates">
          <Button
            style={{
              width: "30px",
              height: "97%",
              backgroundColor: "#ffffff",
              borderRight: "1px solid gray",
              borderRadius: "0px",
              borderTopLeftRadius: "5px",
              borderBottomLeftRadius: "5px",
            }}
          >
            <i className="bi-arrow-left"></i>
          </Button>

          <i
            style={{
              fontSize: "20px",
              marginLeft: "10px",
            }}
            className="bi-calendar2-check"
          ></i>
          <span> This, week, 26 Sep - 2 Oct 2022 </span>
          <Button
            style={{
              width: "30px",
              height: "97%",
              marginLeft: "6px",
              backgroundColor: "#ffffff",
              borderLeft: "1px solid gray",
              borderRadius: "0px",
              borderTopRightRadius: "5px",
              borderBottomRightRadius: "5px",
            }}
          >
            <i className="bi-arrow-right"></i>
          </Button>
        </div>

        <div className="track-user">
          <i
            style={{ fontSize: "23px", marginLeft: "5px" }}
            className="bi-person"
          ></i>
          <div style={{ width: "82%" }}>
            <span style={{ margin: "auto", marginLeft: "5%" }}>{userName}</span>
          </div>
          <i style={{ fontSize: "15px" }} className="bi-caret-right-fill"></i>
        </div>
      </section>
      <Divider
        borderColor="gray"
        width="96.40%"
        marginTop="15px"
        marginLeft="30px"
      />
      <section className="client-projects">
        
      </section>
      <Divider
        borderColor="gray"
        width="96.40%"
        marginTop="15px"
        marginLeft="30px"
      />
      <Box w="97%" ml="30px" mt="5px">
        {formArr &&
          formArr.map((i, ind) => (
            <HoursForm
              key={ind}
              hours={hours}
              handleHours={setHours}
              i={i}
            />
          ))}
      </Box>
    </div>
  );
}
