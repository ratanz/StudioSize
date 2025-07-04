"use client";

import React, { useCallback, useRef, useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import Image from "next/image";
import "swiper/css/bundle";
import gsap from "gsap";
import Link from "next/link";


type MediaItem = {
  img: string;
  video: string;
  title: string;
  subtitle: string;
};

const Page3: React.FC = () => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // const [scrollPosition, setScrollPosition] = useState(0);

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
        const newIndex = Math.min(prevIndex + itemsPerView, mediaItems.length - 1);
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

  const mediaItems: MediaItem[] = [
    {
      img: "/assets/exat.png",
      video : "https://player.vimeo.com/progressive_redirect/playback/1004471199/rendition/720p/file.mp4?loc=external&log_user=0&signature=320fa11af9886195ea8511cb8eb8dd07cd139ee0b681e23d36d562f646069f31",
      title : "Exat",
      subtitle : "Modernism in motion.",
    },
  {
    img : "/assets/divote.jpg",
    video : "https://player.vimeo.com/progressive_redirect/playback/1004471199/rendition/720p/file.mp4?loc=external&log_user=0&signature=320fa11af9886195ea8511cb8eb8dd07cd139ee0b681e23d36d562f646069f31",
    title : "Divo",
    subtitle : "The future of video editing.",
  },
    {
      img: "/assets/HotType.jpg",
      video:
        "/assets/vid1.mp4",
      title: "Hot Type",
      subtitle: "Red hot type animations",
    },
    {
      img: "/assets/alterscope.png",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/968641716/rendition/540p/file.mp4?loc=external&log_user=0&signature=60e18c3db2933fc8327f5f78c06b5e3287b950fc7d988492ecfa06c5c8b3dfc2",
      title: "Alterscope",
      subtitle: "Web3 risk in real time",

    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Determ_Featured-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912967024/rendition/540p/file.mp4?loc=external&log_user=0&signature=9b206386649900f4c73acd6e193081224721ef5577f4e8ab9628e820238c270d",
        title:"Determ",
        subtitle:"Sensible media monitoring",
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2023/06/VK_Ikons_Cover_2-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/941107506/rendition/720p/file.mp4?loc=external&log_user=0&signature=5b350f4dd98331c48ba6d4341f564e42d5ee04be4a4aaf8eb71e6fda7dc962ce",
        title:"VK Ikons",
        subtitle: "Iconic vine blend"
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Arsfutura_Featured-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912966817/rendition/540p/file.mp4?loc=external&log_user=0&signature=8b6be2b56122ea980233f32e4dfdce2c7eedcf9b6e80249374b02c8879779ff4",
        title:"Ars Futura",
        subtitle:"Future starts today"
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Vignelli_Featured-567x709.png",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912967388/rendition/540p/file.mp4?loc=external&log_user=0&signature=86176de0eeebb48fbc0394bd0bb2670214f6d7287a3ba1573bae69865046775d",
        title:"Vignelli 90th anniversary",
        subtitle:"Paying tribute to Massimo"

    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/06/Umaki_Featured-video-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/953460095/rendition/540p/file.mp4?loc=external&log_user=0&signature=66fdeb5e5965284b276e376c06799e8a41a17b3aa0efaccde5565d500b8fe2d1",
        title:"Umaki",
        subtitle:"Trip for your taste buds"
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Cindric_Featured-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912966934/rendition/540p/file.mp4?loc=external&log_user=0&signature=03b3f99d74b1960477dbea7761a9d2af138173aa7360b1555c5e487d08f4980c",
        title:"Cindric",
        subtitle:"Minimal architecture"
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Bronza_Featured-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912966858/rendition/540p/file.mp4?loc=external&log_user=0&signature=d107374fd799b8882a9cc73f5aeaaf90d4bac8fe1b41ab0a1a69a788a47301e0",
        title:"Bronza",
        subtitle:"Coined pasta"
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Motion_Array_Featured-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912967269/rendition/540p/file.mp4?loc=external&log_user=0&signature=95c4eabc2f9edd97d30024d1d28db0d8b218eb3b9b0920b1d9736c4f4ec27fdb",
        title:"Motion Array",
        subtitle: "Awesome motion templates"
    },
    {
      img: "https://studio-size.com/wp-content/uploads/2024/04/Pomalo_Featured-567x709.jpg",
      video:
        "https://player.vimeo.com/progressive_redirect/playback/912989853/rendition/540p/file.mp4?loc=external&log_user=0&signature=16dbee1ff02cd6a65b5cf705268dab7665a28701a107f303d8b1fd156eafc494",
        title:"Pomalo",
        subtitle:"Laid-back skincare"
    },
  ];

  return (
    <div className="page-3 bg-black w-full lg:h-[52vw] h-[75vw] p-6 lg:p-14 font-[Satoshi]">
      <div className="text-content flex justify-between items-center w-full ]">
        <h1 className="text-white text-xl lg:text-5xl md:text3xl ">Featured work</h1>
        <div className="buttons flex items-center justify-between w-fit gap-1 hover:bg ">
          <Link href="../portfolio">
          <button className="lg:p-3 lg:px-5 p-[1px] px-[9px] border-2 border-[#1d1d1dec] rounded-full text-[#ffffff] relative overflow-hidden group">
            <span
             className="relative z-10 text-[12px] lg:text-lg">View all</span>
            <span className="absolute inset-0 z-0 bg-transparent group-hover:bg-[#252525e3] transition-colors duration-300 ease-[cubic-bezier(0.51,0.01,0.2,1)]" />
            <span
              className="absolute inset-0 z-0 bg-[#252525e3] scale-0 group-hover:scale-100 rounded-full transition-transform duration-300 ease-[cubic-bezier(0.51,0.01,0.2,1)]"
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
          {mediaItems.map((item, index) => (
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
