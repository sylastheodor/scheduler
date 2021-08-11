const getAppointmentsForDay = function(state, day) {
  const chosenDay = state.days.filter(obj => obj.name === day)
  // console.log('chosenDay: ', chosenDay[0])
  if(chosenDay[0] !== undefined){
    const result = chosenDay[0].appointments.map(y => state.appointments[y]) 
    return result
  } else {
    const result =[];  
    return result
  }
};

const getInterview = function(state, interview) {
  if(interview) {
    const interviewer = state.interviewers[interview.interviewer]
    const student = interview.student
    return  {interviewer, student}
  } else {
    return null
  }
}

const getInterviewersForDay = function(state, day) {
  const chosenDay = state.days.filter(obj => obj.name === day)
  if(chosenDay[0] !== undefined){
    const result = chosenDay[0].interviewers.map(y => state.interviewers[y]) 
    return result
  } else {
    const result =[];  
    return result
  }
}

//code review this one it feels bad.

export { getAppointmentsForDay, getInterview, getInterviewersForDay }