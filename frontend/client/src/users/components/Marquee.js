import React from 'react'
import Marquee from "react-fast-marquee";
import './Marquee.css'

export const Marque = () => {
  return (
    <section className="marquee-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee className="d-flex justify-content-between align-items-center">
                <div className="mx-4 w-25 b-1">
                  <img
                    src="images/brand-01.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-02.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-03.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-04.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-05.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-06.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-07.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
                <div className="mx-4 w-25">
                  <img
                    src="images/brand-08.png"
                    className="marqueeImage"
                    alt="brand logo"
                  />
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
