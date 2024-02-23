'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ImageType } from '@/types';

interface CarouselProps{
  imageList: ImageType[] | null;
}

export  default function CarouselComponent({imageList}:CarouselProps) {
  const [width, setWidth] = useState(0);
  const caroucel: any = useRef();

  useEffect(() => {
    setWidth(() => caroucel.current.scrollWidth - caroucel.current.offsetWidth + 100);
  }, [caroucel?.current?.scrollWidth, imageList, caroucel]);

  return (
    <motion.div
      ref={caroucel}
      className="flex flex-col items-center justify-center mx-1 overflow-hidden w-full h-[300px]  rounded-md md:flex-row cursor-grab"
    >
      <motion.div
        drag="x"
        initial={{ x: -100 }}
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: 'grabbing' }}
        className="flex p-1 gap-x-1  w-full h-full"
      >
        <AnimatePresence>
          {imageList?.map((item: ImageType) => {
            return (
              <motion.img
                className="min-h-full min-w-full overflow-hidden rounded-md "
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
