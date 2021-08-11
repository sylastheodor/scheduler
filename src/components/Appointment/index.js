import React, { Fragment } from "react";
import axios from "axios";
import "./styles.scss";
import Header from "./header";
import Show from "./show";
import Empty from "./empty";
import Form from "./Form";
import Status from "./status";
import Confirm from "./confirm";
import Error from "./error";
import useVisualMode from "hooks/useVisualMode";
import { getInterview, getAppointmentsForDay } from "helpers/selectors";
import { tsPropertySignature } from "@babel/types";

export default function Appointment(props) {
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const SAVE_ERROR = "SAVE_ERROR"
  const DELETE_ERROR = "DELETE_ERROR"

  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
    
    function save(name, interviewer) {
      const interview = {
        student: name,
        interviewer
      };
      transition(SAVING)
      props.bookInterview(props.id, interview)
      .then(response => {
        transition(SHOW, true)
      })
      .catch(response => {
        transition(SAVE_ERROR, true)
      })
    }
    
    function trash(){ //props.id as id
      const id = props.id  
      transition(DELETING, true)
        props.cancelInterview(id)
        .then(res => {
          transition(EMPTY, true)
        })
        .catch(res => {
          transition(DELETE_ERROR, true)
        })
  }
  
  function edit(name, interviewer){
    transition(SAVING)
    const id = props.id
    axios.delete(`/api/appointments/${id}`)
    const interview = {
      student: name,
      interviewer
    };
    props.bookInterview(id, interview)
    return axios.put(`/api/appointments/${id}`, { interview })
    .then(res => {transition(SHOW, true)})
  }
  
  
  return (
    <>
    <Header time={props.time} />
    <article className="appointment" time={props.time}>

    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    
    {mode === SHOW && (
      <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete={() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}
      />
      )}
    
    {mode === SAVE_ERROR && <Error message = {"we had an oopsie while saving"} onClose = {() => back()}/>}

    {mode === DELETE_ERROR && <Error message = {"we had an oopsie while deleting"} onClose = {() => back()}/>}

    {mode === CREATE && (
      <Form 
      onCancel ={() => back()} 
      interviewers = {props.interviewers}
      onSave ={save}
      interview={props.interview}
      bookInterview={props.bookInterview}
      
      />
      )}

    {mode === EDIT && (
      <Form
      onCancel ={() => back()}
      interviewers = {props.interviewers}
      onSave = {edit}
      interview={props.interview}
      bookInterview={props.bookInterview}
      />
    )}

    {mode === SAVING && (
      <Status message={'Saving'}/>
    )}

    {mode === DELETING && (
      <Status message={'Deleting...'}/>
    )}
    
    {mode === CONFIRM && (
      <Confirm message={'Are you sure?'} onConfirm={() => trash(props.cancelInterview)} onCancel={() => back()}/>
    )}
      
      { mode }
    </article>
    </>
  );
}
