export const getAppointmentsForDay = (state, day) => {
	if (!state.days) return [];
	const foundDay = state.days.find((selectedDay) => selectedDay.name === day);

	// console.log('this is selectedDay from foundDay', foundDay);
	// => foundDay is an object with properity that is array of appointments
	if (!foundDay) return [];

	return foundDay.appointments.map((element) => state.appointments[element]);

	//Steps to developing selector, to be REFACTORED
	// const appointments = foundDay.appointments; => this as array
	// const appointmentDetails = appointments.map(element => state.appointments[element]);

	// 1) return foundDay (for testing console.log)
	// 2) return appointments
	// 3) return appointmentDetails;
};

export const getInterview = (state, interview) => {
	if (!interview) return null;
	// console.log(state.interviewers);

	const interviewerNumber = interview.interviewer;
	const student = interview.student;
	const interviewerList = { ...state.interviewers };
	const interviewer = interviewerList[interviewerNumber];

	return { student, interviewer };
};

export const getInterviewersForDay = (state, day) => {
	const foundDay  = state.days.find((selectedDay) => selectedDay.name === day);

	if (!foundDay) return [];

	return foundDay.interviewers.map((element) => state.interviewers[element]);

}