import React from "react";
import "components/InterviewerList.scss";
import InterviewerListItem from "./InterviewerListItem";
import PropTypes from 'prop-types'

function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {props.interviewers.map((obj) => (
        <InterviewerListItem
          setInterviewer={() => props.setInterviewer(obj.id)}
          selected={props.value === obj.id}
          name={obj.name}
          key={obj.id}
          avatar={obj.avatar}
        />
        ))}
        </ul>
    </section>
  );
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};

export default InterviewerList;