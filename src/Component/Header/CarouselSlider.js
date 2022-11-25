import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
const CarouselSlider = () => {
  return (
    <Carousel>
      <div className="CaroImg">
        <img
          className="img-fluid"
          src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RWLAEH"
        />
        <p className="legend">20% Discout</p>
      </div>
      <div className="CaroImg">
        <img
          className="img-fluid"
          src="https://i.pinimg.com/originals/3f/ba/5a/3fba5afb447f5ffaa9f4396e4a218199.jpg"
        />
        <p className="legend">10% Discout</p>
      </div>
    </Carousel>
  );
};

export default CarouselSlider;
