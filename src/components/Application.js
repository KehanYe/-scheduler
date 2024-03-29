import React, { useState, useEffect } from 'react';

import DayList from './DayList';
import Appointment from 'components/Appointment/';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from '../helpers/selectors';

import useApplicationData from 'hooks/useApplicationData';

import 'components/Application.scss';

export default function Application(props) {
	const { state, setDay, bookInterview, deleteInterview } = useApplicationData();

	const interviewforDay = getInterviewersForDay(state, state.day);

	const appointments = getAppointmentsForDay(state, state.day).map((appointment) => {
		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment
				key={appointment.id}
				id={appointment.id}
				time={appointment.time}
				interview={interview}
				interviewer={interviewforDay}
				bookInterview={bookInterview}
				deleteInterview={deleteInterview}
			/>
		);
	});

	return (
		<main className="layout">
			<section className="sidebar">
				<img className="sidebar--centered" src="images/logo.png" alt="Interview Scheduler" />
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList days={state.days} value={state.day} setDay={setDay} />
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
