import React from "react";
import styles from "./menu-button.module.scss";

function MenuButton(props) {
    return (
        <button
            data-toplevel={props.topLevel}
            data-button={true} data-expanded={true} data-selected={props.selected} data-text={props.text}
            className={`${styles[props.buttonType]} ${props.expanded ? styles.expanded : ""} ${props.selected ? styles.selected : ""}`}
        >{props.text}</button>
    );
}

export default MenuButton;