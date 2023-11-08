import { navData } from "../../lib/navData";
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MenuOpenRoundedIcon from '@mui/icons-material/MenuOpenRounded';
import { NavLink } from "react-router-dom";
import {useState} from "react";
import styles from './NavBar.module.css';

export default function topNav() {
  const [open, setopen] = useState(true)
  const toggleOpen = () => {
    setopen(!open)
}
  return (
    <div className={open?styles.topnavBtn:styles.topnavBtnOpen}>
      <button className={styles.menuBtn} onClick={toggleOpen}>
              {open? <MenuRoundedIcon />: <MenuOpenRoundedIcon />}
      </button>
      <div className={open?styles.topnav:styles.topnavOpen}>
      <a href="/" className={styles.toplogo}><img src="../../assets/tip-informal-logo.png" alt="logo" className="w-full h-12 object-contain" /></a>
        {navData.map(item =>{
            return <NavLink key={item.id} className={styles.topitem} to={item.link}>
                      {item.icon}
                      <span className={open?styles.linkText:styles.linkTextOpen}>{item.text}</span>
                  </NavLink>
        })}
      </div>
    </div>
  )
}