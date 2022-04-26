import React, {useState, useEffect} from 'react';
import axios from "axios";

export default function useApplicationData() {
  
  // state of selected day
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

  return { state, setDay, bookInterview, deleteInterview}

}