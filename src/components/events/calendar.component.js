import moment from "moment";
import React, { useState, useEffect } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { OverlayTrigger } from "react-bootstrap";
import { Popover } from "react-bootstrap";

function Event({ event }) {

  let popoverClickRootClose = (
    <Popover id="popover-trigger-click-root-close" style={{ zIndex: 10000 }}>
      <h5>{event.title}</h5>
      <p>{event.description}</p>
    </Popover>
  );

  return (
    
    <div>
      <div>
        <OverlayTrigger
          id="help"
          trigger="click"
          rootClose
          container={this}
          placement="bottom"
          overlay={popoverClickRootClose}
        >
          <div>{event.title}</div>
        </OverlayTrigger>
      </div>
    </div>
  );
}

export default function New() {
  const localizer = momentLocalizer(moment);
  const [currevents, setCurrentEvents] = useState([]);

  useEffect(() => {
    getEvents();
  }, []);

  const getEvents = () => {
    fetch("https://localhost:7100/api/CurrentEvents/getallcurrentevents", {
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => setCurrentEvents(data))
      .catch((err) => console.error(err));
  };
  const events = currevents.map((currevent) => {
    return {
      id: currevent.currentEventId,
      title: currevent.eventName,
      description: "Venue: " + currevent.venue.venueName,
      start: new Date(currevent.begin),
      end: new Date(currevent.end),
      allDay: false,
      hexColor: Math.floor(Math.random() * 16777215).toString(16),
    };
  });
  const eventStyleGetter = (event) => {
    var backgroundColor = "#" + event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      borderRadius: "0px",
      opacity: 0.8,
      color: "black",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };
  return (
    <div className="text-center container mt-4 mb-4">
      <div className="text-center my-5">
        <h1 className="fw-bolder">Events calendar</h1>
      </div>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="month"
        startAccessor="start"
        endAccessor="end"
        views={["month", "week", "day", "agenda"]}
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: Event,
        }}
      />{" "}
    </div>
  );
}
