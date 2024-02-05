'use client';
import { Variants, motion } from 'framer-motion';

interface AnimatedVerticalProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  yStart?: number;
}

export function AnimatedVerticalComponent({
  children,
  className,
  duration,
  yStart,
}: AnimatedVerticalProps) {
  const variantAnimation: Variants = {
    offscreen: {
      y: yStart ? yStart : 300,
      opacity: 0,
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'linear',
        duration: duration ? duration : 1,
      },
    },
  };
  return (
    <motion.div
      initial={'offscreen'}
      whileInView="onscreen"
      viewport={{ once: true, amount: 'some' }}
      variants={variantAnimation}
      className={className}
    >
      {children}
    </motion.div>
  );
}
