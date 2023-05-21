import axios from 'axios';
import React from 'react'
import { useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import Logout from './Logout';

const getUserName = (token) => {
  return axios.get(`http://localhost:8080/company`, {
    headers: { token: token },
  });
};

export default function Sidebar() {

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    let token = JSON.parse(localStorage.getItem("token"));
    // console.log("in track page----->",token)
    getUserName(token)
      .then((res) => {
        // console.log("user name--->", res.data[0].userId.name);
        setUserName(res.data[0]?.name); ///////////////////////////////////////////////////////////////////
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  const box2 = [
    {
      icon: "stopwatch",
      title: "Задать время",
      location: "/dashboard/track",
    },
    { icon: "briefcase", title: "Табели", location: "/dashboard/projects" },
    {
      icon: "bar-chart",
      rIcon: "bi-chevron-down",
      marginLeft: "55px",
      title: "Отчеты",
      location: "/dashboard/reports",
    },
    {
      icon: "folder",
      rIcon: "bi-chevron-down",
      marginLeft: "62px",
      title: "Сотрудники",
      location: "/dashboard/users",
    },

  ];

  const box4 = [
    // { icon: "question-circle", title: "Help", location: "#",isLogout:false },
    // { icon: "phone", title: "Apps", location: "#",isLogout:false },
    // { icon: "bell", title: "What's new", location: "#",isLogout:false },
    {
      icon: "person",
      rIcon: "chevron-up",
      marginLeft: "18px",
      title: userName,
      location: "#",isLogout:true
    },
  ];

  return (
    <div className="sidebar">
      <div className="box1">
        <i
          style={{ marginLeft: "20px", fontSize: "20px" }}
          className="bi bi-grid-3x3-gap-fill"
        ></i>
        <img
          className="logo"
          src="https://img.freepik.com/premium-vector/clock-vector-illustration-on-white-background-office-clock-illustration-countdown-clock-counter-timer-countdown-art-design-eps-10_158224-116.jpg"
          alt="logo"
        />
      </div>

      <div className="box2">
        {box2.map((item,ind) => (
          <div key={ind} className="items">
            <Link style={{ width: "100%" }} to={item.location}>
              {" "}
              <i
                style={{ marginLeft: "20px", fontSize: "18px" }}
                className={`bi-${item.icon}`}
              >
                {" "}
              </i>
              <span className="title">{item.title}</span>{" "}
              <i
                style={{ marginLeft: `${item.marginLeft}`, fontSize: "13px" }}
                className={`${item.rIcon}`}
              >
                {" "}
              </i>
            </Link>
          </div>
        ))}
      </div>

      {/* <div className="box3">
        <h5
          style={{
            width: "80%",
            margin: "auto",
            fontSize: "15px",
            paddingTop: "15px",
          }}
        >
          Pro trial expires in 13 days.
        </h5>
        <h3
          style={{
            marginLeft: "20px",
            fontSize: "21px",
            fontWeight: "500",
            marginTop: "2px",
          }}
        >
          Keep/leave the Pro
        </h3>
      </div> */}

      <div className="box4">
        {box4.map((item,ind) => (
          <div key={ind}>
            <div className="items">
              {  item.isLogout ? (<Logout userName={item.title}/>) :       
              <Link  style={{ width: "100%" }} to={item.location}>
                {" "}
                <i
                  style={{ marginLeft: "20px", fontSize: "18px" }}
                  className={` bi-${item.icon}`}
                ></i>
                <span className="title">{item.title}</span>{" "}
                <i
                  style={{ marginLeft: `${item.marginLeft}`, fontSize: "13px" }}
                  className={`bi-${item.rIcon}`}
                ></i>
              </Link>
}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

