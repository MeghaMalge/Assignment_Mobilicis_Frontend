import React, { useEffect, useState } from "react";
import Carousel from "react-simply-carousel";

import { useHttpClient } from "../../hooks/http-hook";
import useWindowSize from "../../hooks/useWindowSize";
import ErrorModal from "../ErrorModal";
import LoadingSpinner from "../LoadingSpinner";
import Header from "../Header";
import CityItem from "../CityItem";

import "./CitiesCarousel.css";

export default function CitiesCarousel() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [cities, setCities] = useState();
  const [activeSlide, setActiveSlide] = useState(0);
  const [width] = useWindowSize();

  useEffect(() => {
    const fetchCities = async () => {
      const data = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/cities/top10`
      );

      if (!error) {
        setCities(data);
      }
    };
    fetchCities();
  }, [error, sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Header className="heading1">Our Top Cities</Header>
      <div className="cities-container">
        {isLoading && (
          <div className="center">
            <LoadingSpinner overlay />
          </div>
        )}
        {!isLoading && cities && (
          <Carousel
            containerProps={{
              style: {
                width: "100%",
                justifyContent: width < 800 ? "space-between" : "center",
                userSelect: "none",
              },
            }}
            activeSlideIndex={activeSlide}
            onRequestChange={setActiveSlide}
            forwardBtnProps={{
              children: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
                  />
                </svg>
              ),
              className: "btn-icon",
            }}
            backwardBtnProps={{
              children: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="icon"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5"
                  />
                </svg>
              ),
              className: "btn-icon",
            }}
            itemsToShow={width > 800 ? 4 : width > 600 ? 2 : 1}
            itemsToScroll={1}
            speed={400}
            easing="linear"
          >
            {cities.map((item) => (
              <CityItem item={item} />
            ))}
          </Carousel>
        )}
      </div>
    </>
  );
}
