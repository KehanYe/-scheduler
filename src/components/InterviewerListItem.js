import React from 'react';
import classNames from 'classnames';
import 'components/InterviewerListItem.scss';

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;

	const InterviewerItemsClass = classNames({
    'interviewers__item--selected': selected,
    'interviewers__item': !selected
  });
  
	return (
		<li className={InterviewerItemsClass} onClick={setInterviewer}>
			<img className="interviewers__item-image" src={avatar} alt={name} />
			{selected && name}
		</li>
	);
}
