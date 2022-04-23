import React, { useState, useEffect } from 'react';
import axios from "axios";

// Components

import DayList from './DayList'
import Appointment from 'components/Appointment/';

// SASS Styling
import 'components/Application.scss';

const appointmentsData = {
  "1": {
    id: 1,
    time: "12pm",
  },
  "2": {
    id: 2,
    time: "1pm",
    interview: {
      student: "Lydia Miller-Jones",
      interviewer:{
        id: 3,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      }
    }
  },
  "3": {
    id: 3,
    time: "2pm",
  },
  "4": {
    id: 4,
    time: "3pm",
    interview: {
      student: "Archie Andrews",
      interviewer:{
        id: 4,
        name: "Cohana Roy",
        avatar: "https://i.imgur.com/FK8V841.jpg",
      }
    }
  },
  "5": {
    id: 5,
    time: "4pm",
  }
};
// console.log(Object.values(appointmentsData))
const appointments = Object.values(appointmentsData).map(
  appointment => {
    return <Appointment 
    key={appointment.id} 
    {...appointment} 
    />
  } 
);

export default function Application(props) {
  // const [set, setState] = useState({});
	// const [day, setDay] = useState("Monday");

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointment: {}
  });

  const setDay = day => setState({...state, day})
  const setDays = days => setState({...state, days: days})

  useEffect(() => {
    axios.get('http://localhost:8001/api/days')
    .then(response => {
      console.log("axios get request for days=>", response.data);
      const days = response.data
      setState(prev =>({...prev, days}))
    })
  }, []);

  console.log("state.days", state.days)

  return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu"> 
          <DayList
            days={state.days}
            value={state.day}
            onChange={state.setDay}
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
