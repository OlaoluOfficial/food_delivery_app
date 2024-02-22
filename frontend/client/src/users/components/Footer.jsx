import React from "react";
import classes from "../styles/footer.module.css";
import { Link } from "react-router-dom";
import {
  AiFillInstagram,
  AiFillFacebook,
  AiFillTwitterCircle,
  AiFillMail,
  AiFillAppstore,
  AiFillApple,
} from "react-icons/ai";
import img from "../img/footer-logo.png";

export default function Footer() {
  return (
    <section id="faq" className={classes.containerv}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <img src={img} alt="logo"></img>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Links of Interest</h2>
          <ul className={classes.list}>
            <Link className={classes.footerLink} to="">
              About Us
            </Link>
            <Link className={classes.footerLink} to="/faqs">
              FAQ
            </Link>
            <Link className={classes.footerLink} to="">
              Contact Us
            </Link>
          </ul>
        </div>

        <div className={classes.col}>
          <h2 className={classes.title}>Newsletter</h2>
          <ul className={classes.list}>
            <li>Subscribe to our newsletter</li>
            <li>Receive the latest meals</li>
            <li>Get the menu with promo</li>
            <li>Everything weekly!</li>
          </ul>
        </div>
        <div className={classes.col}>
          <h2 className={classes.title}>Social Media</h2>
          <ul className={classes.iconList}>
            <li>
              <AiFillFacebook />
            </li>

            <li>
              <AiFillInstagram />
            </li>
            <li>
              <AiFillTwitterCircle />
            </li>
            <li>
              <AiFillMail />
            </li>
          </ul>
          <ul className={classes.iconList1}>
            <li>
              <AiFillAppstore />
            </li>

            <li>
              <AiFillApple />
            </li>
          </ul>
        </div>
      </div>
      <div className={classes.last}>
        <p>&copy; Copyright {new Date().getFullYear()} EatRite.</p>
      </div>
    </section>
  );
}
