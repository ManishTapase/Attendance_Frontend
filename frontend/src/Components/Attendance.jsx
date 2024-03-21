import React, { useEffect, useState } from "react";
import Header from "./Header";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { useAuth } from "./authContext";
import axios from "axios";
import "./attend.css";
import { useNavigate } from "react-router-dom";
const ValuePiece = Date | null;

const Value = ValuePiece | [ValuePiece, ValuePiece];

const dateArray = [];
const Attendance = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [value, onChange] = useState(new Date());
  const [name, setName] = useState("");
  const [date, setDate] = useState(value.toUTCString());
  const [status, setStatus] = useState(false);
  useEffect(() => {
    if (auth.user) {
      setName(auth.user.id);
    }
    setDate(value.toUTCString());
  }, [auth.user, value.toUTCString()]);
  useEffect(() => {
    if (auth.user) {
      getAttendance(auth.user.id);
    }
  }, [auth.user, dateArray]);
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/user/set-attendance`,
        { name, date, status }
      );
      if (res.data.success) {
        alert(res.data.message);
        getAttendance(auth.user.id);
      } else {
        alert("error in while  setting attendance");
      }
    } catch (error) {
      alert("select present to submit....!", error);
    }
  };
  const getAttendance = async (name) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/get-attendance/${name}`
      );

      dateArray.push(...response.data.attendanceDates);
    } catch (error) {
      console.error(error);
    }
  };
const  deleteAttendance= async(name, val)=>{
    try {
      const response = await axios.post(
        `http://localhost:5000/api/user/delete-attendance/${name}`,
        { val }
      );
      getAttendance(auth.user.id);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (auth.user || dateArray.length ) {
      getAttendance(auth.user.id);
    }
  }, [auth.user, dateArray.length]);

  return (
    <>
      <Header />
      <section id="sec">
        <form id="frm" onSubmit={handelSubmit}>
          <div className="mb-3">
            <input
              id="inp"
              type="text"
              placeholder="Enter your Name"
              name="name"
              required
              value={auth.user ? auth.user.name : "Guest"}
              onSubmit={() => setName(auth.user.id)}
            />
          </div>
          <div className="mb-3">
            <input
              id="inp"
              type="text"
              placeholder="Enter your Name"
              name="name"
              required
              value={value.toDateString()}
            />
          </div>
          <div id="drp">
            <li
              className="nav-item dropdown"
              style={{
                listStyleType: "none",
              }}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                color="#6947da"
              >
                <a style={{ fontSize: "1em", fontWeight: "bold" }}>
                  {status ? "Present" : "Absent"}
                </a>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    style={{ fontSize: "1em", fontWeight: "bold" }}
                    onClick={() => setStatus(true)}
                  >
                    Present
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => setStatus(false)}
                    style={{ fontSize: "1em", fontWeight: "bold" }}
                  >
                    Absent
                  </a>
                </li>
              </ul>
            </li>
          </div>
          <div>
            <button type="submit" id="sbmt">
              submit
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => deleteAttendance(name, value.toUTCString())}
              id="edt"
            >
              delete
            </button>
          </div>
          <div id="shw">
            <div
              style={{
                height: "2em",
                width: "2em",
                background: "#2bda91",
                borderRadius: "6px",
              }}
            ></div>
            &nbsp;
            <h5
              style={{
                fontSize: "1em",
              }}
            >
              present
            </h5>
          </div>
        </form>
        <CalendarContainer id="clndrpos">
          {dateArray.length > 0 ? (
            <>
              <Calendar
                onChange={onChange} 
                value={value}
                tileClassName={({ date }) => {
                  const isHighlighted = dateArray.find((x) => {
                    const d = new Date(x);
                    return (
                      date.getDate() === d.getDate() &&
                      date.getMonth() === d.getMonth() &&
                      date.getFullYear() === d.getFullYear()
                    );
                  });

                  return isHighlighted ? "highlight" : "";
                }}
              />
            </>
          ) : (
            <>
              <Calendar
                onChange={onChange} 
                value={value}
                tileClassName={({ date }) => {
                  const isHighlighted = dateArray.find((x) => {
                    const d = new Date(x);
                    return (
                      date.getDate() === d.getDate() &&
                      date.getMonth() === d.getMonth() &&
                      date.getFullYear() === d.getFullYear()
                    );
                  });

                  return isHighlighted ? "highlight" : ""; 
                }}
              />
            </>
          )}
        </CalendarContainer>
      </section>
    </>
  );
};

export default Attendance;
const CalendarContainer = styled.div`
  .highlight {
    background: #2bda91;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar {
    width: 400px;
    max-width: 100%;
    background-color: #fff;
    color: #222;
    border-radius: 8px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.125em;
  }
  .react-calendar__navigation button {
    color: #6f48eb;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin-top: 8px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #f8f8fa;
  }
  .react-calendar__navigation button[disabled] {
    background-color: #f0f0f0;
  }
  abbr[title] {
    text-decoration: none;
  }
  /* .react-calendar__month-view__days__day--weekend {
  color: #d10000;
 } */
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 6px;
  }
  .react-calendar__tile--now {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #6f48eb33;
    border-radius: 6px;
    font-weight: bold;
    color: #6f48eb;
  }
  .react-calendar__tile--hasActive:enabled:hover,
  .react-calendar__tile--hasActive:enabled:focus {
    background: #f8f8fa;
  }
  .react-calendar__tile--active {
    background: #6f48eb;
    border-radius: 6px;
    font-weight: bold;
    color: white;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #6f48eb;
    color: white;
  }
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
  }
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: #6f48eb;
    border-radius: 0;
  }
  .react-calendar__tile--rangeStart {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    background: #6f48eb;
    color: white;
  }
  .react-calendar__tile--rangeEnd {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #6f48eb;
    color: white;
  }
`;
