'use client'

import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import RegisteredItems from "./components/modals/RegisteredItems";
import requester from "./utils/requester";

interface CarouselItem {
  id: number;
  imageUrl: string;
  title: string;
}

interface RegisteredItem {
  id: number;
  thumbnailUrl: string;
  title: string;
  likes: number;
  hits: number;
}

const Home: React.FC = () => {
  const [carouselItems, setCarouselItems] = useState<CarouselItem[]>([]);
  const [registeredItems, setRegisteredItems] = useState<RegisteredItem[]>([]);

  useEffect(() => {
    // Fetch carousel items
    const fetchCarouselItems = async () => {
      try {
        const response = await fetch("/api/carousel");
        if (!response.ok) {
          throw new Error("Failed to fetch carousel items");
        }
        const data = await response.json();
        setCarouselItems(data);
      } catch (error) {
        console.error(error);
      }
    };

    // Fetch registered items
    const fetchRegisteredItems = async () => {
      try {
        const response = await requester!.get("/api/items");
        if (response.status === 200) {
          const data = response.data;
          setRegisteredItems(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    // fetchCarouselItems();
    fetchRegisteredItems();
  }, []);

  // Carousel settings for react-slick
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel Section */}
      <div className="p-6 bg-white shadow-md">
        <Slider {...carouselSettings}>
          {carouselItems.map((item) => (
            <div key={item.id} className="relative">
              <img src={`/uploads/${item.imageUrl}`} 
                alt={item.title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white p-2 rounded-lg">
                <h2 className="text-lg font-bold">{item.title}</h2>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Registered Items Section */}
      <RegisteredItems items={registeredItems}/>
    </div>
  );
};

export default Home;
