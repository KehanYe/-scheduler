import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {
	// state of selected day
	const [ state, setState ] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
		// bookInterview: {bookInterview}
	});

  // Gary's solution
	// function updateSpot(state, appointments) {
  //   const dayObj = state.days.find((day) => day.name === state.day);

	// 	let spots = 0;
	// 	for (const id of dayObj.appointments) {
	// 		const appointment = appointments[id];
	// 		if (!appointment.interview) {
	// 			spots++;
	// 		}
	// 	}
  //   const day = {...dayObj, spots}
  //   const days = state.days.map(d => d.name === state.day ? day : d)
  //   setState((prev) =>  {return {...prev, days}})
	// }

  // Exsisting Solution
	function spotsForDay(day, appointments) {
    return day.appointments.length - 
      day.appointments.reduce(
        (count, id) => 
          (appointments[id].interview ? count + 1 : count), 0);
		// const currentDay = state.days.find((day) => day.name === state.day);

		// const updateSpotsDays = state.days.map((day) => {
		// 	if (day.id === currentDay.id) {
		// 		return { ...day };
		// 	}
		// 	return { ...day, spots: (day.spots) };
		// });

		// return updateSpotsDays;
	}

	function bookInterview(id, interview) {
		const appointment = { ...state.appointments[id], interview: { ...interview }};
		const appointments = { ...state.appointments, [id]: appointment };

    // let days;
    // if (!edit) { 
    //   days = updateSpotOld(-1)
    // } 

    const days = state.days.map(day => { 
      return day.appointments.includes(id) 
        ? { ...day, spots: spotsForDay(day, appointments)} : day; 
    });

		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((res) => {
			setState({ ...state, appointments, days}); // add days to revert to old code
		});
		// console.log("state from bookInterview", state)
	}

	function deleteInterview(id, interview) {
		const appointment = { ...state.appointments[id], interview: null };
		const appointments = { ...state.appointments, [id]: appointment };
		// const days = updateSpotOld(+1);

    const days = state.days.map(day => { 
      return day.appointments.includes(id) 
        ? { ...day, spots: spotsForDay(day, appointments)} : day; 
    });

		return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview }).then((res) => {
			console.log('axios deleteInterview', res);
			setState({ ...state, appointments, days});
		});
	}

	const setDay = (day) => setState({ ...state, day });
	// const setDays = days => setState({...state, days: days})

	useEffect(() => {
		Promise.all([
			// axio request recieved as arrays
			axios.get('http://localhost:8001/api/days'),
			axios.get('http://localhost:8001/api/appointments'),
			axios.get('http://localhost:8001/api/interviewers')
		]).then((valuePromise) => {
			// console.log("resolve from Promise.valuePromise", valuePromise)
			const days = valuePromise[0].data;
			// console.log("days after Promise.valuePromise", days)
			const appointments = valuePromise[1].data;
			// console.log("appoinments after Promise.valuePromise", appointments)
			const interviewers = valuePromise[2].data;
			// console.log("interviewers after Promise.valuePromise", interviewers)

			setState((prev) => ({ ...prev, days, appointments, interviewers }));
			// console.log("appoinments after Promise.valuePromise", appointments)
		});
	}, []);

	// console.log("state.days", state.days)

	return { state, setDay, bookInterview, deleteInterview };
}
