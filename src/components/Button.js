import React from "react";

import "components/Button.scss";
import { action } from "@storybook/addon-actions";
import classNames from "classnames";


export default function Button(props) {
   const buttonClass = classNames("button", {
      "button--confirm": props.confirm,
      "button--danger": props.danger
    });
  

   return <button className = {buttonClass} disabled = {props.disabled} onClick = {props.onClick}>
      {props.children}
   </button>;
}
