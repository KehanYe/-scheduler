import React from 'react';
import useVisualMode from 'hooks/useVisualMode';
import './styles.scss';

import Header from 'components/Appointment/Header';
import Show from 'components/Appointment/Show';
import Empty from 'components/Appointment/Empty';
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from './Confirm';
// import Error from './Error';

const EMPTY = 'EMPTY';
const SHOW = 'SHOW';
const CREATE = 'CREATE';
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT"

export default function Appointment({ id, time, interview, interviewer, bookInterview, deleteInterview}) {
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	// debugger

	function save(name, interviewer) {
		transition(SAVING)
    const interview = {
			student: name,
			interviewer
		};
		// console.log("save function properties", interviewer, interview)
		// console.log('id in appointment component', id);
		bookInterview(id, interview).then(() => transition(SHOW));
	}

	function deleteAppointment() {
		transition(DELETING)
    console.log('id in appointment component', id);
    deleteInterview(id).then( res => transition(EMPTY));
	}


	// console.log('mode in index', mode);

	return (
		<article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SAVING && <Status message={"Saving..."} />}
			{mode === CREATE && <Form interviewers={interviewer} onCancel={back} onSave={save} />}
			{mode === SHOW && <Show 
        student={interview.student} 
        interviewer={interview.interviewer} 
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />}
      {mode === DELETING && <Status message={"Deleting..."} />}
      {mode === CONFIRM && <Confirm onCancel={back} onConfirm={deleteAppointment} message={"Are you sure you want to delete"}/>}
      {mode === EDIT && <Form 
        interviewers={interviewer} 
        onCancel={back} 
        onSave={save} 
        student={interview.student}
        interviewer={interview.interviewer.id}
      />}
  	</article>
	);
}
