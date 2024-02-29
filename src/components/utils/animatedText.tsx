'use client'

import {motion} from "framer-motion"

interface AnimetedTextProps{
    text: string;
    className: string;
    delay?: number
    onclick: () => void
}

export  function AnimatedSubTitleComponent({text,delay, className, onclick}:AnimetedTextProps) {
    const words = text.split("")

    const defaultAnimations = {
        hidden:{
            opacity: 0,
            y:40,
        },
        visible:{
            opacity: 1,
            y:0, 
        }
    }

  return (
    <motion.div className={className} transition={{staggerChildren: 0.005}}  initial={"hidden"} animate={"visible"} onClick={onclick} >
        {
            words.map((word:string, index:number) => {
                return(
                    <motion.span
                    aria-hidden
                    key={index}
                    variants={defaultAnimations} // Use a variação padrão para cada palavra
                    initial="hidden"
                    whileInView="visible"
                    transition={{ delay: index * 0.019 + (delay ? delay : 0) }} // Aplique um atraso escalonado com base no índice da palavra
                  >
                    {word}
                  </motion.span>
                )
            })
        }
    </motion.div>
  )
}
