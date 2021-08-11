import React from "react";
import DayListItem from "./DayListItem";

/*
days:Array a list of day objects (each object includes an id, name, and spots)
day:String the currently selected day
setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
*/
export default function DayList(props) {

  return props.days.map((day) => (
    <DayListItem key={day.id} name={day.name} selected={day.name===props.day} spots={day.spots} setDay={() => props.setDay(day.name)} />
  ));
}
