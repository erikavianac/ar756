'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { ImageType } from '@/types';

interface WelcomeCarroucelProps {
  imageList: ImageType[];
}

export function WelcomeCarroucelComponent({ imageList }: WelcomeCarroucelProps) {
  const [width, setWidth] = useState(0);
  const caroucel: any = useRef();

  const variantAnimation: Variants = {
    offscreen: {
      x: 0,
    },
    onscreen: {
      x: -500,
      transition: {
        type: 'linear',
        duration: 5,
      },
    },
  };

  useEffect(() => {
    setWidth(() => caroucel.current.scrollWidth - caroucel.current.offsetWidth);
  }, [caroucel?.current?.scrollWidth, caroucel]);
  
  return (
    <motion.div
      ref={caroucel}
      className="flex flex-col items-center justify-center mx-1 overflow-hidden bg-gray-200 rounded-md md:flex-row cursor-grab "
    >
      <motion.div
        drag="x"
        variants={variantAnimation}
        initial={'offscreen'}
        whileInView={'onscreen'}
        viewport={{ once: true, amount: 'all' }}
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: 'grabbing' }}
        className="flex w-full h-full p-1 gap-x-1"
      >
        <AnimatePresence>
          {imageList?.map((item: ImageType) => {
            return (
              <motion.img
                className="min-w-full max-h-[18rem] overflow-hidden rounded-md "
                key={item?.id}
                src={item?.imageUrl}
              />
            );
          })}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
