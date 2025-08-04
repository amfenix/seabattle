import React from "react";
import styles from "./Fleet.module.scss";

export default function Ship({size, onSelect}) {
    return <button
        style={{
            '--shipSize': size
        }}
        className={styles.ship}
        onClick={onSelect}
        aria-label="ship"
    />
}
