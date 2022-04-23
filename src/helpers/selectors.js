export function getAppointmentsForDay(state, day) {
  if (!state.days) return []
  const foundDay = state.days.find(days => days.name === day);
  
  // console.log("this is found day", foundDay)
  if (!foundDay) return [];

  return foundDay.appointments.map(element => state.appointments[element])
  //Steps to developing selector, to be REFACTORED
  // const appointments = foundDay.appointments;
  // const appointmentDetails = appointments.map(element => state.appointments[element]);

  // return foundDay (for testing console.log)
  // return appointments
  // return appointmentDetails;
};