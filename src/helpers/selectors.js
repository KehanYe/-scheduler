export const getAppointmentsForDay = (state, day) => {
	if (!state.days) return [];

	const foundDay = state.days.find((selectedDay) => selectedDay.name === day);

	if (!foundDay) return [];

	return foundDay.appointments.map((element) => state.appointments[element]);
};

export const getInterview = (state, interview) => {
	
	if (!interview) return null;

	const interviewerNumber = interview.interviewer;
	const student = interview.student;
	const interviewerList = { ...state.interviewers };
	const interviewer = interviewerList[interviewerNumber] || {};

	return { student, interviewer };
};

export const getInterviewersForDay = (state, day) => {
	const foundDay  = state.days.find((selectedDay) => selectedDay.name === day);

	if (!foundDay) return [];

	return foundDay.interviewers.map((element) => state.interviewers[element]);

}