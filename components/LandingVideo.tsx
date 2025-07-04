'use client';

import gsap from "gsap";
import React, { useEffect, useCallback, useRef } from "react";

const Part2: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (cursorRef.current) {
      const cursorWidth = cursorRef.current.offsetWidth;
      const cursorHeight = cursorRef.current.offsetHeight;
      gsap.to(cursorRef.current, {
        x: e.clientX - cursorWidth / 2,
        y: e.clientY - cursorHeight / 2,
        duration: 0.5,
        ease: "power2.out"
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 1,
        duration: 0.3
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        scale: 0,
        duration: 0.3
      });
    }
  }, []);

  useEffect(() => {
    const part2content = document.querySelector(".part2-content") as HTMLElement;

    if (part2content) {
      part2content.addEventListener("mousemove", handleMouseMove as EventListener);
      part2content.addEventListener("mouseenter", handleMouseEnter);
      part2content.addEventListener("mouseleave", handleMouseLeave);
    }

    // Initial cursor position
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { scale: 0, x: '-50%', y: '-50%' });
    }

    // Cleanup event listeners on component unmount
    return () => {
      if (part2content) {
        part2content.removeEventListener("mousemove", handleMouseMove as EventListener);
        part2content.removeEventListener("mouseenter", handleMouseEnter);
        part2content.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return (
    <div className="part2 w-full h-[59vw] relative bg-black">
      <div
        ref={cursorRef}
        className="cursor h-[11vw] w-[11vw] bg-[#e9e9e9e3] rounded-full fixed top-[0%] z-50 lg:flex sm:hidden items-center justify-center pointer-events-none "
      >
        <h4 className="lg:text-2xl font-bold  ">Play reel</h4> 
      </div>
      <div className="part2-content">
        <video
          autoPlay
          loop
          muted
          src="/assets/page1.mp4"
        ></video>
      </div>
    </div>
  );
};

export default Part2;