"use client";

import NavLink from "../ui-elements/nav-link";

import style from "./footer.module.css";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={style.container}>
      <NavLink
        className={style.nav_link}
        onClick={(e) => {
          e.preventDefault();
        }}
      />
      <div className={style.info}>
        <p>0912-345-678</p>
        <p>kmkk123@msn.com</p>
      </div>
      <p className={style.copyright}>
        ©{year} Sweet A Bit Corp. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
