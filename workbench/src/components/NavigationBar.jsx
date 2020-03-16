import React from 'react';
import GlasswallLogo from './GlasswallLogo/GlasswallLogo.jsx';
import styles from "./main-menu.module.scss";
import Nav from './Nav/Nav.jsx';

function NavigationBar() {

    return (
        <>
            <div className={`${styles.mainMenu} ${styles.expanded}`}>
                <GlasswallLogo />
                <Nav/>
            </div>


        </>
    );

}

export default NavigationBar;
