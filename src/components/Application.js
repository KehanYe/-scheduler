import React, { useState, useEffect } from 'react';
import axios from "axios";

// Components

import DayList from './DayList'
import Appointment from 'components/Appointment/';
import {getAppointmentsForDay, getInterview} from "../helpers/selectors"

// SASS Styling
import 'components/Application.scss';



export default function Application(props) {
  // const [set, setState] = useState({});
	// const [day, setDay] = useState("Monday");

  // const appointmentsDaily= []
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointment: {},
    interviewers: {}
  });

  // console.log("this is state")
  const appointmentsDaily = getAppointmentsForDay(state, state.day)
  const appointments = appointmentsDaily.map( appointment => {
    const interview = getInterview(state, appointment.interview)
      return <Appointment 
      key={appointment.id} 
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      />
      } 
    );

  
  const setDay = day => setState({...state, day})
  // const setDays = days => setState({...state, days: days})

  useEffect(() => {
    // axios.get('http://localhost:8001/api/days')
    // .then(response => {
    //   console.log("axios get request for days=>", response.data);
    //   const days = response.data
    //   setState(prev =>({...prev, days}))

      Promise.all([
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
        console.log("interviewers after Promise.valuePromise", interviewers)

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
