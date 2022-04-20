import React from "react"
import "./styles.scss"

export default function Appointment(props) {

  const appointmentTime = (time) => {
    return time ? `Appointment at ${time}` : "No Appointments";
  };

  return  (
    <article className="appointment">{appointmentTime(props.time)}</article>
  )
};