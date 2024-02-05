'use client';
import { useState, ReactNode } from 'react';
import { useAnimation, motion } from 'framer-motion';
import { AnimatedVerticalComponent } from '../utils/animatedVertical';

interface CardProps {
  w?: string;
  h?: string;
  title?: string;
  className?: string;
  children?: ReactNode;
}

export function CardComponent({ className, w, h, children }: CardProps) {
  const controls = useAnimation();
  const [animate, setAnimate] = useState(false);

  const handleClick = () => {
    setAnimate(true);
    controls.start({ scale: 0.5, transition: { duration: 0.2 } }).then(() => {
      controls.start({ scale: 1, transition: { duration: 0.2 } });
      setAnimate(false);
    });
  };

  return (
    <AnimatedVerticalComponent
      className={`bg-white w-[430px] min-h-[200px] ${w} ${h}  flex flex-col pt-7 pb-10   justify-start items-center gap-y-10 z-30
      ${className}
    `}
    >
      {children}
      {/*  <motion.button
        className={`
          z-30
          w-[150px]
          h-[55px]
          text-[15px]
           tracking-[3px] text-white rounded-md bg-black
           mt-6
          transition duration-300 ease-in-out transform hover:scale-110 active:scale-90 active:transition-none active:duration-500
        `}
        variants={{
          rest: { scale: 1 },
          clicked: { scale: 0.5 },
        }}
        animate={controls}
        onClick={(e) => {
          handleClick();
          e.preventDefault();
          handleOpenReservaModal();
        }}
      >
        CONSULTAR
      </motion.button> */}
    </AnimatedVerticalComponent>
  );
}
