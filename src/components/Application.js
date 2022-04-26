import React, { useState, useEffect } from 'react';
import axios from "axios";

// Components

import DayList from './DayList'
import Appointment from 'components/Appointment/';
import {getAppointmentsForDay, getInterview, getInterviewersForDay} from "../helpers/selectors"

// Hooks
import useVisualMode from "hooks/useVisualMode"

// SASS Styling
import 'components/Application.scss';



export default function Application(props) {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    // bookInterview: {bookInterview}
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: {...interview}
    };
    // console.log("appointment from bookInterview", appointment)

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    // console.log("appointments from bookInterview", appointments)

    return axios.put(`http://localhost:8001/api/appointments/${id}`, {interview})
      .then(res => {setState({ ...state, appointments})
        })
    // console.log("state from bookInterview", state)
  }

  function deleteInterview(id, interview){
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
  
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`, {interview})
    .then(res => { 
      console.log("axios deleteInterview", res); 
      setState({ ...state, appointments})
      })

  }

  const appointmentForDay = getAppointmentsForDay(state, state.day)
  const interviewforDay = getInterviewersForDay(state, state.day)

  // render appointments for selected day
  const appointments = appointmentForDay.map( appointment => {
    // debugger
    const interview = getInterview(state, appointment.interview)
      // console.log("interview from total appointments", interview)
      return <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewer={interviewforDay}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
      />
      } 
    );

  
  const setDay = day => setState({...state, day})
  // const setDays = days => setState({...state, days: days})

  useEffect(() => {
      Promise.all([
        // axio request recieved as arrays
        axios.get('http://localhost:8001/api/days'),
        axios.get('http://localhost:8001/api/appointments'),
        axios.get('http://localhost:8001/api/interviewers')
      ]).then(valuePromise => {
        // console.log("resolve from Promise.valuePromise", valuePromise)
        const days = valuePromise[0].data
        // console.log("days after Promise.valuePromise", days)
        const appointments = valuePromise[1].data
        // console.log("appoinments after Promise.valuePromise", appointments)
        const interviewers = valuePromise[2].data
        // console.log("interviewers after Promise.valuePromise", interviewers)

        setState(prev =>({...prev, days, appointments, interviewers}))
        // console.log("appoinments after Promise.valuePromise", appointments)

    })
  }, []);

  // console.log("state.days", state.days)

  return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu"> 
          <DayList
            days={state.days}
            value={state.day}
            setDay={setDay}
          />
        </nav>
				<img className="sidebar__lhl sidebar--centered" src="images/lhl.png" alt="Lighthouse Labs" />{' '}
			</section>
			<section className="schedule">
				{appointments}
        <Appointment key="last" time="5pm" />
			</section>
		</main>
	);
}
