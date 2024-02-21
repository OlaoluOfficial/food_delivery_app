import { useState } from "react";
import data from "./FAQsData";
import image from "../img/faq-bg-img.jpeg";
import "../styles/Ayeni.css";

function FAQs() {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }

    setSelected(i);
  };

  return (
    <section className="section-faq">
      <div className="containerxx">
        <div className="faq-img-box">
          <img className="image" src={image} alt="FAQS" />
        </div>
        <div className="wrapper">
          <h2 className="faq">
            FAQs &nbsp;<span className="faq-icon"> 📙 </span>
          </h2>
          <div className="accordion">
            {data.map((item, i) => (
              <div className="item">
                <span className="icon">#</span>
                <div className="con">
                  <div className="title" onClick={() => toggle(i)}>
                    <div className="quest">
                      <h2>{item.question}</h2>

                      <span>
                        {selected === i ? <span>❌</span> : <span> ⬇</span>}{" "}
                      </span>
                    </div>
                  </div>
                  <div className="cont">
                    <div
                      className={selected === i ? "content show" : "content"}
                    >
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQs;
