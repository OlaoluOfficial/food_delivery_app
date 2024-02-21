import React from "react";
import classes from "../styles/newsletter.module.css";
import { AiOutlineSend } from "react-icons/ai";
import newsletterIllustration from "../img/get-newsletter-updates.svg";

function Newsletter() {
  return (
    <section id="contacts" className={classes.containerz}>
      <div className={classes.wrapper}>
        <h4 className={classes.subtitle}>Get our latest offers</h4>
        <h2 className={classes.title}>
          Ne<span className={classes.orange}>w</span>slet
          <span className={classes.orange}>t</span>er
        </h2>
        <div className={classes.inputContainer}>
          <input type="text" placeholder="Enter email..." />
          <AiOutlineSend className={classes.sendIcon} />
        </div>
        <img
          src={newsletterIllustration}
          className={classes.illustration}
          alt=""
        />
      </div>
    </section>
  );
}

export default Newsletter;
