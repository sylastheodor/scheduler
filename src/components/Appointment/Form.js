import React from "react"
import "./styles.scss"
import InterviewerList from "components/InterviewerList"
import Button from "components/Button"
import { useState } from "react"

export default function Form(props) {
  const [name, setName] = useState(props.name || '');
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState('');
  
  function validate() {
    if (name === '') {
      setError("Student name cannot be blank")
      return
    }
    props.onSave(name, interviewer)
  }
  

return <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input
        className="appointment__create-input text--semi-bold"
        value={name}
        type="text"
        placeholder="Enter Student Name"
        onChange={(event) => setName(event.target.value)}
        data-testid="student-name-input"
      />
      <section className="appointment__validation">{error}</section>
    </form>
    <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} onClick={() => {setInterviewer()}}/>
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button onClick={props.onCancel} danger>Cancel</Button>
      <Button onClick={() => validate()} confirm>Save</Button>
    </section>
  </section>
</main>
}