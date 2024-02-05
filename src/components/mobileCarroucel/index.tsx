'use client';
import { useEffect, useRef, useState } from 'react';

import { ComodidadeCardComponent } from '../comodidades/comdidadeCard';
import { ServicoCardComponent } from '../servicos/servicoCard';

import { motion } from 'framer-motion';

export function MobileCarroucelComopnent() {
  const caroucel: any = useRef();
  const [width, setWidth] = useState(0);

  return (
    <motion.div
      ref={caroucel}
      className="flex flex-col gap-y-4  my-10"
    >
      <motion.div
        initial={{
          x: 0,
        }}
        whileInView={{ x: '-99%' }}
        viewport={{ once: true, amount: 'all' }}
        transition={{ duration: 2 }}
        drag="x"
        dragConstraints={{ right: 0, left: -width }}
        whileTap={{ cursor: 'grabbing' }}
        className="flex items-start justify-start px-2 md:hidden h-[600px] w-full gap-x-4  inset-0"
      >
        <ComodidadeCardComponent />
        <ServicoCardComponent />
      </motion.div>
    </motion.div>
  );
}
