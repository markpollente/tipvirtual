import MenuOpenRoundedIcon from "@mui/icons-material/MenuOpenRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navData } from "../../lib/navData";
import styles from "./NavBar.module.css";

export default function NavBar() {
  const [open, setOpen] = useState(true);
  const toggleOpen = () => {
    setOpen(!open);
  };
  return (
    <div className={open ? styles.topnavBtn : styles.topnavBtnOpen}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
        {open ? <MenuRoundedIcon/> : <MenuOpenRoundedIcon/>}
      </button>
      <div className={open ? styles.topnav : styles.topnavOpen}>
        {/*<a href="/" className={open ? styles.toplogo : styles.toplogoOpen}><img src="../../assets/tip-informal-logo.png" alt="logo"
                                                    /></a>*/}
        {navData.map(item => {
          return <NavLink key={item.id} className={styles.topitem} to={item.link}>
            {item.icon}
            <span className={open ? styles.linkText : styles.linkTextOpen}>{item.text}</span>
          </NavLink>;
        })}
      </div>
    </div>
  );
}