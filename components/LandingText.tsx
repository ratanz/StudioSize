'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


interface AnimatedTextProps {
  words: string[];
  interval?: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ words, interval = 1000 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, interval);

    return () => clearInterval(timer);
  }, [words, interval]);

  return (
    <div className=" overflow-hidden inline-block lg:absolute md:absolute lg:h-[1.3em] w-full sm:w-[5.65em] sm:ml-[1.5vw]  lg:ml-6 ml-2 ">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentWordIndex}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.7 }}
        >
          {words[currentWordIndex].split('').map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>
       </div>
  );
};

const Page1: React.FC = () => {
  return (    
    <div className='page-part-1 w-full h-[44vw] lg:h-[27vw] sm:h-[39vw] md:h-[45vw] p-4  lg:p-14 sm:p-4 md:p-14 pt-10 sm:pt-10 flex font-[Satoshi]'>
    <div className="content flex flex-col h-full mt-12 sm:mt-24 text-2xl sm:text-4xl md:text-5xl lg:text-[6vw] tracking-tigher sm:tracking-tighter leading-tight sm:leading-[1.1] md:leading-[6vw] font-semibold relative">
      <h1 className='text-white mb-2 sm:mb-0'>Design studio</h1>
      <h1 className='text-white flex '>
        for timeless{' '}
        <span className="block sm:inline relative h-[1.3em]">
          <AnimatedText words={['strategy', 'packaging', 'motion', 'naming', 'branding']} />
        </span>
      </h1>
    </div>
  </div>

  );
};

export default Page1;