'use client';

import { motion } from 'framer-motion';

interface AnimetedTitleProps {
  title: string;
  className: string;
  delay?: number;
  onclick?: () => void
}

export function AnimatedTitleComponent({ title, delay, className, onclick }: AnimetedTitleProps) {
  const words = title.split('');

  const defaultAnimations = {
    offscreen: {
      opacity: 0,
      y: 40,
    },
    onscreen: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      className={className}
      initial={'offscreen'}
      whileInView="onscreen"
      transition={{
        type: 'linear',
        duration: 1,
        staggerChildren: 0.05,
      }}
      onClick={onclick}
    >
      {words.map((word: string, index: number) => {
        return (
          <motion.span
            aria-hidden
            key={index}
            variants={defaultAnimations} // Use a variação padrão para cada palavra
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 'some' }}
            transition={{ delay: index * 0.05 + (delay ? delay : 0), type: 'linear', duration: 1 }} // Aplique um atraso escalonado com base no índice da palavra
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
