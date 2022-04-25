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

export default function Appointment({ time, interview }) {
	const { mode, transition, back } = useVisualMode(interview ? SHOW : EMPTY);

	return (
		<article className="appointment">
			<Header time={time} />
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer} />}
			{mode === CREATE && <Form interviewers={[]} onCancel={back}/>}{/* removed onSave button until further instructions */}
		</article>
	);
}
