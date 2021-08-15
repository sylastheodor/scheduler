import { useState } from "react"

export default function useVisualMode(init) {
  const [mode, setMode] = useState(init);
  const [history, setHistory] = useState([init])
  const transition = (trans, replace = false) => {
    const hist = [...history]
    console.log("history: ", history)
    console.log("hist: ", hist)
    setMode(trans) 
    if (replace) {
      hist.pop()
      hist.push(trans)
    } else {
    hist.push(trans)
    }
    setHistory(hist)
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

