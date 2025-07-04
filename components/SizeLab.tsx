import React from "react";

const Page7 = () => {
  return (
    <div className="w-full h-screen relative bg-black lg:p-14 p-6 font-[Satoshi]  ">
      <div className="video-content bg-black w-full h-full relative overflow-hidden ">
        <video
          className="rounded-[10px] object-cover w-full h-full"
          muted
          autoPlay
          loop
          src="https://studio-size.com/wp-content/uploads/2024/05/Studio-Size-%E2%80%94-Labs02.mp4"
        ></video>

        <div className="absolute inset-0 flex flex-col justify-end lg:p-14 p-4 ">
          <h1 className="text-white text-[5vw] w-[75%] font-bold leading-[4.3vw] tracking-tighter">
            Size Labs — the <br /> place for all artfroms
          </h1>

          <div className="smtext flex items-center justify-between w-fit gap-5 mt-7">
            <h1 className="text-white font-bold">Explore labs</h1>
            <button
              className="p-3 pl-4 pr-4 bg-[#dedededb] border-1 border-gray rounded-full text-black hover:bg-[#f8f8f8e7]
             transtion-all duration-300 ease-in-out w-fit hover:scale-110"
            >
              <i className="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page7;
