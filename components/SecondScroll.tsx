"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { SecondImages, MediaItem } from "./utils/SecondImages";

const Page6: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mediaItems: MediaItem[] = SecondImages;

  // cursor animation and drag functionality
  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (cursorRef.current) {
        const cursorWidth = cursorRef.current.offsetWidth;
        const cursorHeight = cursorRef.current.offsetHeight;
        gsap.to(cursorRef.current, {
          x: e.clientX - cursorWidth / 2,
          y: e.clientY - cursorHeight / 2,
          duration: 0.5,
          ease: "power2.out",
        });
      }

      if (isDragging && containerRef.current) {
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 2;
        containerRef.current.scrollLeft = scrollLeft - walk;
      }
    },
    [isDragging, startX, scrollLeft]
  );

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          opacity: 1,
          duration: 0.3,
          scale: 1,
        });
      }
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 1,
        duration: 0.3,
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        opacity: 1,
        duration: 0.4,
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!isDragging && cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.4,
      });
    }
  }, [isDragging]);

  useEffect(() => {
    const container = containerRef.current;

    if (container) {
      container.addEventListener("mousemove", handleMouseMove as EventListener);
      container.addEventListener("mousedown", handleMouseDown as EventListener);
      container.addEventListener("mouseup", handleMouseUp);
      container.addEventListener("mouseleave", handleMouseLeave);
      container.addEventListener("mouseenter", handleMouseEnter);
    }

    if (cursorRef.current) {
      gsap.set(cursorRef.current, { scale: 0, opacity: 1 });
    }

    return () => {
      if (container) {
        container.removeEventListener(
          "mousemove",
          handleMouseMove as EventListener
        );
        container.removeEventListener(
          "mousedown",
          handleMouseDown as EventListener
        );
        container.removeEventListener("mouseup", handleMouseUp);
        container.removeEventListener("mouseleave", handleMouseLeave);
        container.removeEventListener("mouseenter", handleMouseEnter);
      }
    };
  }, [
    handleMouseMove,
    handleMouseDown,
    handleMouseUp,
    handleMouseEnter,
    handleMouseLeave,
  ]);


  return (
    <div className="page-6 w-full lg:h-[68vw] h-fit p-4 lg:p-14 font-[Satoshi] bg-black">
      <div className="content mt-10 relative">
        <div
          ref={containerRef}
          className="container flex gap-2 lg:gap-7 flex-nowrap overflow-auto overflow-y-hidden whitespace-nowrap"
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
        >
          {mediaItems.map((item, index) => (
            <div
              key={index}
              className="inline-block"
              style={{
                scrollSnapAlign: "start",
              }}
            >
              <div
                className="box rounded-[7px] relative overflow-hidden"
                style={{
                  width: `calc(${item.width}px * 0.8)`, // Adjust width for mobile
                  height: `calc(${item.height}px * 0.8)`, // Adjust height for mobile
                }}
              >
                {item.img && (
                  <Image
                    src={item.img}
                    width={item.width}
                    height={item.height}
                    alt="image"
                    className="transition-opacity duration-300 object-cover w-full h-full ease-in-out"
                  />
                )}
                {item.video && (
                  <video
                    id={`video-${index}`}
                    className="absolute top-0 left-0 w-full h-full z-0 object-cover transition-opacity duration-300 ease-in-out"
                    muted
                    loop
                    autoPlay
                    src={item.video}
                  ></video>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* drag cursor */}
        <div
          ref={cursorRef}
          className="drag-cursor lg:fixed p-2 px-10 top-0 left-0 w-[75px] h-[45px] rounded-full bg-[#f7f7f7f6] text-black flex items-center justify-center text-[15px] pointer-events-none z-50 tranlate-x-[-50%] translate-y-[-50%] opacity-0 font-bold"
        >
          Drag
        </div>

        <div className="text-content w-full h-full lg:mt-16  flex flex-col lg:flex-row">
          <div className="button-container flex items-center justify-between w-full lg:w-[30vw]  gap-5 hover:bg ">
            <div className="button flex items-center justify-between gap-2">
              <button
                // onClick={navigateLeft}
                className="lg:p-3 lg:px-4 p-2 px-3 bg-[#252525e3] border-1 border-gray rounded-full text-white hover:bg-[#424242e7]
             transtion-all duration-300 ease-in-out hover:scale-110"
              >
                <i className="ri-arrow-left-line"></i>
              </button>
              <button
                // onClick={navigateRight}
                className="lg:p-3 lg:px-4 p-2 px-3 bg-[#252525e3] border-1 border-gray rounded-full text-white hover:bg-[#424242e7]
             transtion-all duration-300 ease-in-out hover:scale-110"
              >
                <i className="ri-arrow-right-line"></i>
              </button>
            </div>
          </div>

          <div className="main-text w-full lg:w-[64vw] h-fit lg:flex lg:gap-10 items-center mt-4 lg:mt-0">
            <p className="text-white tracking-[0.1] leading-[1.1] lg:text-2xl text-sm font-semibold">
              Great design has no expiration date. It lasts for years and
              inspires instantly. Our creative freedom enables us to spend more
              time on fewer projects and
            </p>
            <p className="text-white tracking-[0.1] leading-[1.1] lg:text-2xl text-sm lg:mt-0  mt-5 font-semibold">
              focus on the intellectual, functional, and artistic aspects of
              business. Looking to create profound ideas, timeless design, and
              beauty in everyday life.
            </p>
          </div>
        </div>
      </div>

      <div className="about w-full lg:w-[50%] mt-10 ml-0 lg:ml-[29.5vw] flex items-center gap-7">
        <p className="text-white tracking-[0.1] leading-[1.1] text-2xl font-bold">
          About us
        </p>
        <button
          // onClick={navigateRight}
          className="lg:p-3 lg:px-4 p-2 px-3 bg-[#252525e3] border-1 border-gray rounded-full text-white hover:bg-[#424242e7]
             transtion-all duration-300 ease-in-out hover:scale-110"
        >
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Page6;
