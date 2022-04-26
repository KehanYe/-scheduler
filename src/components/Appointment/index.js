import React from 'react';
import useVisualMode from 'hooks/useVisualMode';
import './styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from './Form';
// import Status from './Status';
// import Confirm from './Confirm';
// import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
// const SAVING = "SAVING";

export default function Appointment({ id, time, interview, interviewer, bookInterview}) {
  
  const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);
  
  // debugger

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    }
    // console.log("save function properties", interviewer, interview)
    bookInterview(id, interview);
    transition(SHOW)
  }

  console.log("mode in index", mode)

	return (
		<article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={interviewer} onCancel={back} onSave={save}/>}
    	{mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
		</article>
	);
}
