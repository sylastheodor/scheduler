import React, { useEffect, useState } from "react";
import axios from "axios";

import "components/Application.scss";
import Appointment from "components/Appointment";
import DayList from "./DayList";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useVisualMode from "hooks/useVisualMode";
import useApplicationData from "hooks/useApplicationData";


export default function Application(props) {
  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();

 
    const appointments = getAppointmentsForDay(state, state.day).map((obj) => {
      const interview = getInterview(state, obj.interview)
      const interviewers = getInterviewersForDay(state, state.day)
      console.log('interviewers: ', interviewers)
      return (
        <Appointment
          key={obj.id}
          {...obj}
          id={obj.id}
          time={obj.time}
          interview={interview}
          bookInterview={bookInterview}
          interviewers={interviewers}
          appointments={getAppointmentsForDay(state, state.day)}
          cancelInterview = {cancelInterview}
        />
      );
    
  })

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} day={state.day} setDay={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>
      <section className="schedule">
        {appointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
