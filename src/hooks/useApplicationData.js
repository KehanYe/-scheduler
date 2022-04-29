import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData() {

	const [ state, setState ] = useState({
		day: 'Monday',
		days: [],
		appointments: {},
		interviewers: {}
	});

	function spotsForDay(day, appointments) {
    return day.appointments.length - 
      day.appointments.reduce(
        (count, id) => 
          (appointments[id].interview ? count + 1 : count), 0);
	}

	function bookInterview(id, interview) {
		const appointment = { ...state.appointments[id], interview: { ...interview }};
		const appointments = { ...state.appointments, [id]: appointment };


    const days = state.days.map(day => { 
      return day.appointments.includes(id) 
        ? { ...day, spots: spotsForDay(day, appointments)} : day; 
    });

		return axios.put(`http://localhost:8001/api/appointments/${id}`, { interview }).then((res) => {
			setState({ ...state, appointments, days});
		});
	}

	function deleteInterview(id, interview) {
		const appointment = { ...state.appointments[id], interview: null };
		const appointments = { ...state.appointments, [id]: appointment };

    const days = state.days.map(day => { 
      return day.appointments.includes(id) 
        ? { ...day, spots: spotsForDay(day, appointments)} : day; 
    });

		return axios.delete(`http://localhost:8001/api/appointments/${id}`, { interview }).then((res) => {
			setState({ ...state, appointments, days});
		});
	}

	const setDay = (day) => setState({ ...state, day });

	useEffect(() => {
		Promise.all([
			// axio request recieved as arrays
			axios.get('http://localhost:8001/api/days'),
			axios.get('http://localhost:8001/api/appointments'),
			axios.get('http://localhost:8001/api/interviewers')
		]).then((valuePromise) => {
			const days = valuePromise[0].data;
			const appointments = valuePromise[1].data;
			const interviewers = valuePromise[2].data;

		setState((prev) => ({ ...prev, days, appointments, interviewers }));
		});
	}, []);

	return { state, setDay, bookInterview, deleteInterview };
}
