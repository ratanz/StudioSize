"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const services = [
  {
    name: "Branding",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539456/rendition/720p/file.mp4?loc=external&log_user=0&signature=6d7223a64fad4c23b82a2e42d63d29893a2c20d8bccf2bcdc383a76ab3a4b9b7",
  },
  {
    name: "Brand Strategy",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539477/rendition/720p/file.mp4?loc=external&log_user=0&signature=a9bcd4f5ab7da757f1f08e0c62b83ef33408d6880d2cd93822fa1e58ef0252e7",
  },
  {
    name: "Motion graphics",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539288/rendition/720p/file.mp4?loc=external&log_user=0&signature=9c6d276f268c1a4e21bf58c420eb7514fb42dcab1fbb04dadbb7190bd01e18eb",
  },
  {
    name: "Video editing",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539330/rendition/720p/file.mp4?loc=external&log_user=0&signature=430b2b3f48bbd2f2572a3232634cc170ecdab4475f4835a22fb04a176d95add0",
  },
  {
    name: "3D animation",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539443/rendition/720p/file.mp4?loc=external&log_user=0&signature=e9e65a269293639b41b4c2759d999b54c25fd46386d41cae13fb22d2705fde9b",
  },
  {
    name: "Audio production",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539397/rendition/720p/file.mp4?loc=external&log_user=0&signature=e0ad052ea0b4411dae45853620b37a24f27d88bf05689f71c98997315a12fc5b",
  },
  {
    name: "Web design",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539347/rendition/720p/file.mp4?loc=external&log_user=0&signature=90681da5b1a27a6da15503447cdc83a23477fe0412576ce9c841ddb384f492d3",
  },
  {
    name: "Photography",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539383/rendition/720p/file.mp4?loc=external&log_user=0&signature=205cf375bf7b07cd37bd81fe76c1e85c584abf8120e2a9804a4764adf39a3757",
  },
  {
    name: "Naming",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539424/rendition/720p/file.mp4?loc=external&log_user=0&signature=86f3447577f806380c3baf67af5f2a62d209ad17f223c7efca585560d4b8f2e0",
  },
  {
    name: "Packaging",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539313/rendition/720p/file.mp4?loc=external&log_user=0&signature=f9f78670ebe80a6906656f32973752d9e780781dafdb305b843dd83c4a2cc63e",
  },
  {
    name: "Advertising",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539416/rendition/720p/file.mp4?loc=external&log_user=0&signature=8c1b51fbc4032590fcdb7000c1f59e5203fd5d2f9c336e15ba9b87d345e29a5d",
  },
  {
    name: "Brand Art",
    video:
      "https://player.vimeo.com/progressive_redirect/playback/939539365/rendition/720p/file.mp4?loc=external&log_user=0&signature=d5965ce7678518d264c634924c15654f982211973e44811f9941e8fd3029113e",
  },
];

const Page5: React.FC = () => {
  const [activeVideo, setActiveVideo] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [topSpacerHeight, setTopSpacerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const setTextRef = useCallback(
    (el: HTMLHeadingElement | null, index: number) => {
      textRefs.current[index] = el;
    },
    []
  );

  const setVideoRef = useCallback(
    (el: HTMLVideoElement | null, src: string) => {
      if (el) {
        videoRefs.current[src] = el;
      }
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const videoEl = entry.target as HTMLVideoElement;
            if (!videoEl.src) {
              videoEl.src = videoEl.dataset.src || "";
              videoEl.load();
            }
            observer.unobserve(videoEl);
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(videoRefs.current).forEach((videoEl) => {
      if (videoEl) {
        observer.observe(videoEl);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMouseEnter = useCallback((service: any, index: number) => {
    setActiveVideo(service.video);
    setActiveIndex(index);

    if (
      containerRef.current &&
      textRefs.current[index] &&
      videoContainerRef.current
    ) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const textRect = textRefs.current[index]!.getBoundingClientRect();
      const videoContainerRect =
        videoContainerRef.current.getBoundingClientRect();
      const newTopSpacerHeight =
        textRect.top -
        containerRect.top -
        videoContainerRect.height / 2 +
        textRect.height / 2;
      setTopSpacerHeight(Math.max(0, newTopSpacerHeight));
    }

    // Play the video immediately
    if (videoRefs.current[service.video]) {
      const video = videoRefs.current[service.video]!;
      if(video.src) {
        video.play();
      }
    }
  }, []);

  const handleVideoContainerHover = useCallback(() => {
    if (activeIndex !== -1 && services[activeIndex].video) {
      setActiveVideo(services[activeIndex].video);
    }
  }, [activeIndex]);

  return (
    <div className="bg-black lg:h-[80vw] h-[115vw] w-full">
      <div
        ref={containerRef}
        className="w-full lg:h-[83vw] lg:p-14 p-4 font-[Satoshi] relative "
      >
        <h1 className="text-white font-bold lg:text-[1.3vw] text-sm mb-4">Services</h1>
        <div className="content flex items-start justify-between">
          <div className="w-[100%] relative" style={{ height: "100%" }}>
            <div
              style={{
                height: topSpacerHeight,
                transition: "height 0.5s ease-in",
              }}
            />
            <div
              ref={videoContainerRef}
              className="media w-[45vw] h-[45vw]"
              onMouseEnter={handleVideoContainerHover}
              onMouseLeave={() => setActiveVideo("")}
            >
              {services.map((service) => (
                <video
                  key={service.video}
                  ref={(el) => setVideoRef(el, service.video)}
                  src={service.video}
                  loop
                  muted
                  playsInline
                  className={`w-[45vw] h-[30vw] object-cover rounded-lg absolute transition-opacity duration-300 ${activeVideo === service.video ? "opacity-100" : "opacity-0"
                    }`}
                />
              ))}
            </div>
          </div>

          <div className="text-content w-[70vw]">
            {services.map((service, index) => (
              <motion.h2
                key={index}
                ref={(el) => setTextRef(el, index)}
                className="text-[4.5vw] font-bold tracking-tight leading-[1] mb-2 cursor-pointer"
                initial={{ x: 0, color: "#333333" }}
                animate={{
                  x: activeIndex === index ? 30 : 0,
                  color: activeIndex === index ? "#FFFFFF" : "#333333",
                }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => handleMouseEnter(service, index)}
                onMouseLeave={() => {
                  setActiveVideo("");
                  setActiveIndex(-1);
                  setTopSpacerHeight(0);
                }}
              >
                {service.name}
              </motion.h2>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page5;
