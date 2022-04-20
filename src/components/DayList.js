import React from 'react';
import DayListItem from './DayListItem';
// import DayList from 'components/DayList';

export default function DayList(props) {
  const {value, onChange} = props;

  const days = props.days.map(day =>
    <DayListItem // each array item output is a react component with populated with details of each day
      key={day.id}
      name={day.name}
      spots={day.spots}
      selected={day.name === value}
      setDay={() => onChange(day.name)}
    />
  );

  return (
    <ul>
      {days}
    </ul>
  );
}