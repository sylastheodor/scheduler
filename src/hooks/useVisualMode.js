import { useState } from "react"

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init])
  const transition = (trans, replace = false) => {
    setMode(trans) 
    if (replace) {
      history.pop()
      history.push(trans)
    } else {
    history.push(trans)
    }
  }
  const back = () => {
    if (history.length === 1){
      setMode(history[0])
    } else {
    history.pop() 
    setMode(history[(history.length - 1)])
    }
  }
  return { mode, transition, back };
}

