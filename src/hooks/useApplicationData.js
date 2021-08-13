import { useState , useEffect } from "react";
import axios from "axios";
import useVisualMode from "./useVisualMode";
import Appointment from "components/Appointment";
import { getAppointmentsForDay } from "helpers/selectors";


export default function useApplicationData() {
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  
  useEffect(() => {
    const daysPromise = axios.get("/api/days");
    const apptPromise = axios.get("/api/appointments");
    const interviewersPromise = axios.get("/api/interviewers");
    
    Promise.all([
      Promise.resolve(daysPromise),
      Promise.resolve(apptPromise),
      Promise.resolve(interviewersPromise),
    ]).then((all) => {
      const [getDays, getAppts, getInterviewers] = all;
      setState((prev) => ({
        ...prev,
        days: getDays.data,
        appointments: getAppts.data,
        interviewers: getInterviewers.data,
      }));
    });
  }, [] );
  
  
  const setDay = (daay) => setState((prev) => ({ ...prev, day: daay }));
  
  function updateSpots(id, state) {
    let spots = 0
    const dayIndex = state.days.findIndex(day => day.appointments.includes(id))
    const chosenDay = state.days[dayIndex]
    chosenDay.appointments.forEach(num => {
      if (!state.appointments[num].interview) {
        spots += 1
      }
    })
    const newDay = {
      ...chosenDay,
      spots
    }
    const newDays = [...state.days]
    newDays[dayIndex] = newDay
  
    return newDays
    // console.log('getAppointmentsForDay(state, day): ', getAppointmentsForDay(state, fluglehorn))
    // console.log('getAppointmentsForDay(state, day).length: ', getAppointmentsForDay(state, fluglehorn).length)
    // return spots
    }
      
  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(response => {
      const newState = {...state, appointments}
      const days = updateSpots(id, newState)
      setState({...newState, days}) //need to copy the entirety of our state object
    })
    
  }

  const cancelInterview = function(id) { 
    const appointment = {
          ...state.appointments[id],
          interview: null
        };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }
      return axios.delete(`/api/appointments/${id}`)
      .then(response => {
        const newState = {...state, appointments}
        const days = updateSpots(id, newState)
        setState({...newState, days})
      })
      
  }

  return { state, setDay, bookInterview, cancelInterview }
}