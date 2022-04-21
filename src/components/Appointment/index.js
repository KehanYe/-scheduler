import React from "react"
import "./styles.scss"

export default function Appointment({time}) {

  const appointmentTime = (time) => {
    return time ? `Appointment at ${time}` : "No Appointments";
  };

  return  (
    <article className="appointment">{appointmentTime(time)}</article>
  )
};