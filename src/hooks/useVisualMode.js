import {React, useState} from 'react';

export default function useVisualMode(initial) {
	const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // console.log("useVisualMode", useVisualMode)

  //takes a new mode and sets mode, and updates history
  function transition (newMode, replace = false) {
    if (replace){
      history.pop();
      setMode(initial)
    }
    
    setMode(newMode)
    let updatedHistory = [...history, newMode];
    setHistory(updatedHistory)
  }
  // after removing last element from history, set Mode to last element in history
  function back() {
    if (history.length < 2) {
      return;
    };
    
    history.pop();
    setMode(history[history.length - 1])
  }

  return { mode, transition, back };

}


