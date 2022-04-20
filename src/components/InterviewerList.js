import React from 'react';
import InterviewerListItem from 'components/InterviewerListItem';

// Sass Styling
import 'components/InterviewerList.scss';

export default function InterviewerList(props) {
  const {interviewers, value, onChange} = props; // value is an interview:number representing currently selected interviewer

  // console.log("props passed into InterviewerList", props)
  // console.log("interviewers passed into InterviewerList", interviewers)
  // console.log("value passed into InterviewerList", value)
  console.log("setInterviewer passed into InterviewerList", onChange)


	const interviewerList = interviewers.map(interviewer => (
    <InterviewerListItem 
    key={interviewer.id}
    name={interviewer.name}
    avatar={interviewer.avatar}
    selected={interviewer.id === value}
    setInterviewer={() => onChange(interviewer.id)}    
  />
	));

	return (
		<section className="interviewers">
			<h4 className="interviewers__header text--light">Interviewer</h4>
			<ul className="interviewers__list">{interviewerList}</ul>
		</section>
	);
}
