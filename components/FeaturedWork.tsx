"use client";

import React, { useCallback, useRef, useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Image from "next/image";
import "swiper/css/bundle";
import gsap from "gsap";
import Link from "next/link";
import { FirstPageImages, MediaItem } from "./utils/FirstPageImages";


const Page3: React.FC = () => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const mediaItems: MediaItem[] = FirstPageImages;

    // navigation code for left and right arrows
    const [currentIndex, setCurrentIndex] = useState(0);
    const [itemsPerView, setItemsPerView] = useState(0);

    useEffect(() => {
      const updateItemsPerView = () => {
        if (containerRef.current) {
          const containerWidth = containerRef.current.offsetWidth;
          const firstChild = containerRef.current.children[0] as HTMLElement;
          const itemWidth = firstChild.offsetWidth;
          const gap = 28; // gap between items
          const newItemsPerView = Math.floor(containerWidth / (itemWidth + gap));
          setItemsPerView(newItemsPerView);
        }
      };
  
      updateItemsPerView();
      window.addEventListener('resize', updateItemsPerView);
  
      return () => window.removeEventListener('resize', updateItemsPerView);
    }, []);
  
    const scrollToIndex = (index: number) => {
      if (containerRef.current) {
        const firstChild = containerRef.current.children[0] as HTMLElement;
        const itemWidth = firstChild.offsetWidth;
        const gap = 28; // gap between items
        const scrollPosition = index * (itemWidth + gap);
        containerRef.current.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
      }
    };
  
    const navigateLeft = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = Math.max(prevIndex - itemsPerView, 0);
        scrollToIndex(newIndex);
        return newIndex;
      });
    };
  
    const navigateRight = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = Math.min(prevIndex + itemsPerView, FirstPageImages.length - 1);
        scrollToIndex(newIndex);
        return newIndex;
      });
    };

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

  const handleVideoMouseEnter = (video: HTMLVideoElement) => {
    if (video) {
      video.play();
    }
  };

  const handleVideoMouseLeave = (video: HTMLVideoElement) => {
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };



  return (
    <div className="page-3 bg-black w-full lg:h-[52vw] h-[75vw] p-6 lg:p-14 font-[Satoshi]">
      <div className="text-content flex justify-between items-center w-full ]">
        <h1 className="text-white font-semibold text-xl lg:text-5xl md:text3xl ">Featured work</h1>
        <div className="buttons flex items-center justify-between w-fit gap-1 hover:bg ">
          <Link href="../portfolio">
          <button className="lg:p-2 lg:px-4 p-[1px] px-[9px] border-2 border-[#1d1d1dec] rounded-full text-[#ffffff] relative overflow-hidden group">
            <span
             className="relative z-10 text-[12px] lg:text-lg">View all</span>
            <span className="absolute inset-0 z-0 bg-transparent group-hover:bg-[#252525e3] transition-colors duration-300 ease-[cubic-bezier(0.51,0.01,0.2,1)]" />
            <span
              className="absolute inset-0 z-0 bg-[#1d1d1de3] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.51,0.01,0.2,1)]"
              style={{
                transformOrigin: "center",
              }}
            />
          </button>
          </Link>
          <button
            onClick={navigateLeft}
            className="lg:p-3 lg:px-4 p-1 px-2 bg-[#252525e3] border-1 border-gray rounded-full text-white hover:bg-[#424242e7]
             transition-all duration-300 ease-in-out"
            
          >
            <i className="ri-arrow-left-line"></i>
          </button>
          <button
            onClick={navigateRight}
            className="lg:p-3 lg:px-4 p-1 px-2 bg-[#252525e3] border-1 border-gray rounded-full text-white hover:bg-[#424242e7]
             transition-all duration-300 ease-in-out"
           
          >
            <i className="ri-arrow-right-line"></i>
          </button>
        </div>
      </div>

      <div className="content lg:mt-10 mt-5 relative">
        <div
          ref={containerRef}
          className="container flex gap-7 flex-nowrap overflow-auto overflow-y-hidden"
          style={{ cursor: isDragging ? "grabbing" : "pointer" }}
        >
          {mediaItems.map((item: MediaItem, index: number) => (
            <div key={index} className="flex flex-col">
              <div
                className="box w-[25vw] h-[31vw] bg-white rounded-[7px] relative overflow-hidden group flex-shrink-0"
                onMouseEnter={() =>
                  handleVideoMouseEnter(
                    document.getElementById(
                      `video-${index}`
                    ) as HTMLVideoElement
                  )
                }
                onMouseLeave={() =>
                  handleVideoMouseLeave(
                    document.getElementById(
                      `video-${index}`
                    ) as HTMLVideoElement
                  )
                }
              >
                <Image
                  src={item.img}
                  width={410}
                  height={100}
                  alt="imgae"
                  className="transition-opacity duration-300 object-cover w-full h-full ease-in-out opacity-100 group-hover:opacity-0"
                />
                <video
                  id={`video-${index}`}
                  className="absolute top-0 left-0 w-full h-full z-0 object-cover transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                  muted
                  loop
                  autoPlay
                  src={item.video}
                ></video>
              </div>
              <div className="text-white mt-4">
                <h3 className="lg:text-2xl text-[15px] font-bold">{item.title}</h3>
                <p className="lg:text-lg text-[10px] text-gray-400">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={cursorRef}
          className="drag-cursor fixed p-2 px-10 top-0 left-0 w-[75px] h-[45px] rounded-full bg-[#f7f7f7f6] text-black lg:flex md:hidden hidden items-center justify-center text-[15px] pointer-events-none z-50 translate-x-[-50%] translate-y-[-50%] opacity-0  font-bold"
        >
          Drag
        </div>

      </div>
    </div>
  );
};

export default Page3;
