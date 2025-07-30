'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import { Image as ImageType } from '@/types/venue';
import { useVenueContext } from '@/app/context/VenueContext';

export function WelcomeCarroucelComponent() {
  const [width, setWidth] = useState(0);
  const caroucel = useRef<HTMLDivElement>(null);
  const { getImagesByTag, venue } = useVenueContext();
  const welcomeMobileImageList = getImagesByTag("Welcome-carroucel");

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
    const updateWidth = () => {
      if (caroucel.current) {
        const scrollWidth = caroucel.current.scrollWidth;
        const offsetWidth = caroucel.current.offsetWidth;
        setWidth(scrollWidth - offsetWidth);
      }
    };

    // Atualiza a largura quando as imagens carregarem
    updateWidth();
    
    // Adiciona listener para redimensionamento da janela
    window.addEventListener('resize', updateWidth);
    
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [welcomeMobileImageList]); // Depende da lista de imagens
  
  // Se não há imagens, não renderiza o carrossel
  if (!welcomeMobileImageList || welcomeMobileImageList.length === 0) {
    return null;
  }
  
  return (
    <motion.div
      ref={caroucel}
      className="flex flex-col items-center justify-center mx-1 overflow-hidden bg-gray-200 rounded-md md:flex-row cursor-grab"
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
          {welcomeMobileImageList.map((item: ImageType) => (
            <motion.img
              className="min-w-full max-h-[18rem] overflow-hidden rounded-md"
              key={item?.id}
              src={item?.imageUrl}
              alt="Imagem do carrossel"
              onLoad={() => {
                // Recalcula a largura quando uma imagem carrega
                if (caroucel.current) {
                  const scrollWidth = caroucel.current.scrollWidth;
                  const offsetWidth = caroucel.current.offsetWidth;
                  setWidth(scrollWidth - offsetWidth);
                }
              }}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
