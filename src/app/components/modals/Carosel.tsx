"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {items.map((item) => (
        <div key={item.id} className="relative">
          <img
            src={`/uploads/${item.imageUrl}`}
            alt={item.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded">
            <h2 className="text-lg font-bold">{item.title}</h2>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Carousel;
