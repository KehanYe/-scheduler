import React from 'react';
import classNames from 'classnames';
import 'components/DayListItem.scss';

function formatSpots(spots) {
	if (spots > 1) {
		return spots + ' spots remaining';
	} else if (spots === 1) {
		return spots + ' spot remaining';
	}
	return 'no spots remaining';
}

export default function DayListItem(props) {
	const { name, spots, selected, setDay } = props;

	const DayListItemClass = classNames('day-list__item', {
		'day-list__item--selected': selected,
		'day-list__item--full': spots === 0
	});

	return (
		<li data-testid="day" className={DayListItemClass} onClick={setDay}>
			<h2 className="text--regular">{name}</h2>
			<h3 className="text--light">{formatSpots(spots)}</h3>
		</li>
	);
}
