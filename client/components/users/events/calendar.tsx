import { useEffect, useState } from "react";
import { IDay } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { Grid } from "@mui/material";

//Calendar props interface
interface ICalendar {
  events: string | any[];
  handleDayOpen: () => void;
  setDate: any;
  setDateEvents: any;
}

//Calendar functional component
const Calendar = (props: ICalendar) => {
  //Calendar states
  const [nav, setNav] = useState(0);
  const [days, setDays] = useState<IDay[]>([]);
  const [dateDisplay, setDateDisplay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        //Sets the days of the week
        const weekdays = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];

        //Sets the current day, month, and year
        const currentDate = new Date();
        const currentDay = currentDate.getDate();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();

        const date = new Date();

        if (nav !== 0) {
          date.setMonth(new Date().getMonth() + nav);
        }

        //Gets the first day of the month and the number of days in the month
        const month = date.getMonth();
        const year = date.getFullYear();
        const firstMonthDay = new Date(year, month, 1);
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        //Converts the the first month day into a string format
        const dateString = firstMonthDay.toLocaleDateString("en-us", {
          weekday: "long",
          year: "numeric",
          month: "numeric",
          day: "numeric",
        });

        //Sets the state of the day, month, and year
        setDateDisplay(
          `${date.toLocaleDateString("en-us", { month: "long" })} ${year}`
        );
        setMonth(`${date.toLocaleDateString("en-us", { month: "long" })}`);
        setYear(year.toString());

        //Calculates the number of padding days?
        const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

        //Loops through the list of days in the month plus the padding days
        const daysArray = [];
        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
          //?
          let dayStringYear = year.toString();
          let dayMonth = month + 1;
          let dayStringMonth = dayMonth.toString();
          if (dayStringMonth.toString().length === 1) {
            dayStringMonth = "0" + dayStringMonth.toString();
          }

          //?
          let dayDay = i - paddingDays;
          let dayStringDay = dayDay.toString();
          if (dayStringDay.toString().length === 1) {
            dayStringDay = "0" + dayStringDay.toString();
          }

          //?
          let todayDayString = currentDay.toString();
          if (todayDayString.length === 1) {
            todayDayString = "0" + todayDayString;
          }

          //?
          let todayMonthString = currentMonth.toString();
          if (todayMonthString.length === 1) {
            todayMonthString = "0" + todayMonthString;
          }

          //?
          let todayYearString = currentYear.toString();
          const dayString = `${dayStringYear}-${dayStringMonth.toString()}-${dayStringDay.toString()}`;
          const today = `${todayYearString}-${todayMonthString}-${todayDayString}`;

          //?
          let hasEvent = false;
          for (let j = 0; j < props.events.length; j++) {
            const calendarMonth =
              new Date(props.events[j].event_date).getMonth() + 1;
            //?
            if (
              dayMonth === calendarMonth &&
              dayDay.toString() ===
                new Date(props.events[j].event_date).getDate().toString() &&
              dayStringYear ===
                new Date(props.events[j].event_date).getFullYear().toString()
            ) {
              hasEvent = true;
            }
          }

          //Applies the day to the days array if not a padding day
          if (i > paddingDays) {
            daysArray.push({
              value: i - paddingDays,
              date: dayString,
              today: today,
              hasEvent: hasEvent,
            });
            hasEvent = false;
          } else {
            daysArray.push({
              value: "padding",
              date: "",
              today: "",
              hasEvent: hasEvent,
            });
          }
        }
        setDays(daysArray);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [props.events, nav]);

  //Display day's modal on calendar day click
  const handleDayClicked = async (day: string) => {
    try {
      //Display day modal
      props.handleDayOpen();
      //Set the selected date to display in the modal
      const selectedDate = `${month} ${day}, ${year}`;
      props.setDate(selectedDate);

      //Set the days events
      const daysEvents = [];
      for (let i = 0; i < props.events.length; i++) {
        if (
          new Date(props.events[i].event_date).toString() ===
          new Date(selectedDate).toString()
        ) {
          daysEvents.push(props.events[i]);
        }
      }
      props.setDateEvents(daysEvents);
    } catch (err) {
      console.log(err);
    }
  };

  //Calendar component
  return (
    <Grid>
      <Grid className="grid grid-center user-calendar-container">
        <Grid className="grid month-row">
          {/* Move one month back */}
          <Grid>
            <button onClick={() => setNav(nav - 1)} className="month-back">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </Grid>
          <Grid className="title month-title">{dateDisplay.toLowerCase()}</Grid>
          {/* Move one month forward */}
          <Grid>
            <button onClick={() => setNav(nav + 1)} className="month-forward">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </Grid>
        </Grid>
        {/* Days of the week*/}
        <Grid className="day-names">
          <Grid className="day-name">sun</Grid>
          <Grid className="day-name">mon</Grid>
          <Grid className="day-name">tue</Grid>
          <Grid className="day-name">wed</Grid>
          <Grid className="day-name">thur</Grid>
          <Grid className="day-name">fri</Grid>
          <Grid className="day-name">sat</Grid>
        </Grid>
        {/* Map through and display month's days based on specified conditions */}
        <Grid className="title day-boxes">
          {days.map((day, index) => (
            <Grid key={index}>
              {day.value === "padding" ? (
                ""
              ) : day.hasEvent ? (
                <Grid className="day-box event-day">
                  <Grid
                    className="center-num"
                    onClick={() => handleDayClicked(day.value)}
                  >
                    {day.value}
                  </Grid>
                </Grid>
              ) : day.date === day.today ? (
                <Grid className="day-box day-today">
                  <Grid
                    className="center-num"
                    onClick={() => handleDayClicked(day.value)}
                  >
                    {day.value}
                  </Grid>
                </Grid>
              ) : (
                <Grid className="day-box">
                  <Grid
                    className="center-num"
                    onClick={() => handleDayClicked(day.value)}
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
