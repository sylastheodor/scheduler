import React from "react"
import "./styles.scss"
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"
import { useState } from "react"

export default function Form(props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  // const reset = function() {setName(''); setInterviewer(null)};
  // const cancel = () => {return props.onCancel, () => reset()}
  

return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        /*
          This must be a controlled component
        */
      />
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} onClick={() => {setInterviewer()}}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={() => props.onSave(name, interviewer)} confirm>Save</Button>
    </section>
  </section>
</main>
}