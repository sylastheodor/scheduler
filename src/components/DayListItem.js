import classNames from "classnames";
import React from "react";
import "components/DayListItem.scss"

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0,
  })

  const formatSpots = function(spots) {
    if (spots <= 0) {
      return 'no spots remaining'
    }
    if (spots === 1) {
      return '1 spot remaining'
    }
    if (spots > 1) {
      return `${spots} spots remaining`
    }
  }

  return (

    <li onClick={props.setDay} data-testid="day" className={dayClass}>
      <h2 >{props.name}</h2> 
      <h3 >{formatSpots(props.spots)}</h3>
    </li>
  );
}