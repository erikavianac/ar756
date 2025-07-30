"use client";
import { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

export function AnimatedArrowComponent() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Esconde a seta quando o usuário rolar mais de 50% da altura da tela
      if (scrollY > windowHeight * 0.5) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2 z-40
        transition-all duration-500 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <IoIosArrowDown 
        className="text-white animate-bounce text-3xl cursor-pointer hover:scale-110 transition-transform duration-200" 
        onClick={handleClick}
        aria-label="Clique para rolar para baixo"
      />
    </div>
  );
} 