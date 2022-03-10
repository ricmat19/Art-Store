import React, { useEffect, useState } from "react";
// import IndexAPI from "../../../apis/indexAPI";
import { IDay } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";

const Calendar = (props: any) => {
  const [nav, setNav] = useState(0);
  //   const [setClicked] = useState();
  const [events] = useState(props.events);
  const [days, setDays] = useState<IDay[]>([]);
  const [dateDisplay, setDateDisplay] = useState("");
  //   const [daysEventsModal, setDaysEventsModal] = useState("modal");
  //   const [selectedDay, setSelectedDay] = useState("");

  //   const daysEventsRef = useRef();

  //Get a list of the days to dos
  //   const eventForDate = (date: string) => {
  //     let daysEvents = [];
  //     for (let i = 0; i < events.length; i++) {
  //       if (events[i].event_date === date) {
  //         daysEvents.push(events[i].title);
  //       }
  //     }
  //     return daysEvents;
  //   };

  //   const displayEventsModal = (day) => {
  //     if (day.events.length > 0) {
  //       setDaysEventsModal("modal modal-active");
  //       setSelectedDay(day.date);
  //     }
  //   };

  //   const eventsArray = [];
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         document.addEventListener("mousedown", (event) => {
  //           if (dayseventsRef.current !== null) {
  //             if (!dayseventsRef.current.contains(event.target)) {
  //               setDaysEventsModal("modal");
  //             }
  //           }
  //         });
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         //Get a list of all of the events in the DB
  //         const eventsResponse = await IndexAPI.get(`/events`);
  //         for (let i = 0; i < eventsResponse.data.data.events.length; i++) {
  //             eventsArray.push(eventsResponse.data.data.events[i]);
  //         }
  //         setEvents(eventsArray);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  //Setup Calendar
  useEffect(() => {
    const fetchData = async () => {
      try {
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const date = new Date();

        if (nav !== 0) {
          date.setMonth(new Date().getMonth() + nav);
        }

        const month = date.getMonth();
        const year = date.getFullYear();

        const firstMonthDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        const dateString = firstMonthDay.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        setDateDisplay(
          `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
        );

        const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

        const daysArray = [];
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
          let dayStringYear = year.toString();
          let dayMonth = month + 1;
          let dayStringMonth = dayMonth.toString();
          if (dayStringMonth.toString().length === 1) {
            dayStringMonth = "0" + dayStringMonth.toString();
          }
          let dayDay = i - paddingDays;
          let dayStringDay = dayDay.toString();
          if (dayStringDay.toString().length === 1) {
            dayStringDay = "0" + dayStringDay.toString();
          }

          let todayDayString = currentDay.toString();
          if (todayDayString.length === 1) {
            todayDayString = "0" + todayDayString;
          }
          let todayMonthString = currentMonth.toString();
          if (todayMonthString.length === 1) {
            todayMonthString = "0" + todayMonthString;
          }
          let todayYearString = currentYear.toString();

          const dayString = `${dayStringYear}-${dayStringMonth.toString()}-${dayStringDay.toString()}`;
          const today = `${todayYearString}-${todayMonthString}-${todayDayString}`;
          if (i > paddingDays) {
            daysArray.push({
              value: i - paddingDays,
              event: "test",
              //   event: eventForDate(dayString),
              date: dayString,
              today: today,
            });
          } else {
            daysArray.push({
              value: "padding",
              event: null,
              date: "",
              today: "",
            });
          }
        }
        setDays(daysArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [events, nav]);

  return (
    <Grid>
      <Grid className="grid grid-center user-calendar-container">
        <Grid className="grid month-row">
          <Grid>
            <button onClick={() => setNav(nav - 1)} className="month-back">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Grid>
          <Grid className="title month-title">{dateDisplay.toLowerCase()}</Grid>
          <Grid>
            <button onClick={() => setNav(nav + 1)} className="month-forward">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Grid>
        </Grid>
        <Grid className="day-names">
          <Grid className="day-name">sun</Grid>
          <Grid className="day-name">mon</Grid>
          <Grid className="day-name">tue</Grid>
          <Grid className="day-name">wed</Grid>
          <Grid className="day-name">thur</Grid>
          <Grid className="day-name">fri</Grid>
          <Grid className="day-name">sat</Grid>
        </Grid>
        <Grid className="title day-boxes">
          {days.map((day, index) => (
            <Grid key={index}>
              {day.value === "padding" ? (
                ""
              ) : //   ) : day.event.length > 0 && day.date === day.today ? (
              //   day.event.length > 0 &&
              day.date === day.today ? (
                <Grid
                  className="day-box day-box-task-today"
                  onClick={() => {
                    day.value !== "padding";
                    //   ? setClicked(day.date)
                    //   : setClicked("");
                  }}
                >
                  <Grid
                    // onClick={() => displayEventModal(day)}
                    className="center-num"
                  >
                    {day.value}
                  </Grid>
                </Grid>
              ) : day.date === day.today ? (
                <Grid
                  className="day-box day-today"
                  onClick={() => {
                    day.value !== "padding";
                    //   ? setClicked(day.date)
                    //   : setClicked("");
                  }}
                >
                  <Grid
                    // onClick={() => displayEventModal(day)}
                    className="center-num"
                  >
                    {day.value}
                  </Grid>
                </Grid>
              ) : (
                //   ) : day.event.length > 0 ? (
                //     <Grid
                //       className="day-box day-box-task"
                //       onClick={() => {
                //         day.value !== "padding"
                //         //   ? setClicked(day.date)
                //         //   : setClicked("");
                //       }}
                //     >
                //       <Grid
                //         onClick={() => displayEventModal(day)}
                //         className="center-num"
                //       >
                //         {day.value}
                //       </Grid>
                //     </Grid>
                <Grid
                  className="day-box"
                  onClick={() => {
                    day.value !== "padding";
                    //   ? setClicked(day.date)
                    //   : setClicked("");
                  }}
                >
                  <Grid
                    // onClick={() => displayEventModal(day)}
                    className="center-num"
                  >
                    {day.value}
                  </Grid>
                </Grid>
              )}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Calendar;
