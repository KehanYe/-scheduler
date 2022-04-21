import React from "react"
import "./styles.scss"

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
// import Form from './Form';
// import Status from './Status';
// import Confirm from './Confirm';
// import Error from './Error';


export default function Appointment({time, interview}) {

  return  (
    <article className="appointment">
      <Header time={time} />
        {interview ? <Show student={interview.student} interviewer={interview.interviewer} /> : <Empty />}
    
    </article>
  )
};