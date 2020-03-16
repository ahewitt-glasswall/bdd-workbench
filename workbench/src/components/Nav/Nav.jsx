import React, { useState, useEffect, useCallback } from "react";
import MenuButton from "../MenuButton/MenuButton.jsx";
import styles from "./nav.module.scss";

function Nav() {
    const [currentButtonSelected, setCurrentButtonSelected] = useState("homeButton");

    return (
        <nav className={`${styles.nav} ${true}`}>
            <MenuButton
                buttonType="homeButton"
                text="Home"
            />


            <MenuButton
                buttonType="backButton"
                text="Exit"
            />
        </nav>
    );
}

export default Nav;