import { React, useState } from 'react';

export default function useVisualMode(initial) {
	// const [ mode, setMode ] = useState(initial);
	const [ history, setHistory ] = useState([ initial ]);
	// console.log("useVisualMode history", history)

	//takes a new mode and sets mode, and updates history
	function transition(newMode, replace = false) {
		if (replace) {
			setHistory(prev => [...prev.slice(0, prev.length - 1), newMode])
		} else {
			setHistory(prev => [...prev, newMode])
		}
	}
	// after removing last element from history, set Mode to last element in history
	function back() {
		if (history.length < 2) {
			return;
		}
		setHistory(prev => [...prev.slice(0, prev.length - 1)]);
	}

	return { mode: history[history.length - 1], transition, back };
} // mode is just property with last element of history
