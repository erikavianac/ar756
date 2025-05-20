'use client';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { twMerge } from 'tailwind-merge';
export interface PropsNewModal {
  children: any;
  onClose: any;
  animate?: boolean;
  styleExternal?: string;
  styleInternal?: string;
  id?:string
}

export function ModalComponent({
  onClose,
  children,
  styleExternal,
  styleInternal,
  animate,
  id
}: PropsNewModal) {

  const modalId = id ? id :'modal-root';

  const [modalRoot, setModalRoot] = useState<Element | null>(null);

  useEffect(() => {
    // Salva a posição atual do scroll
    const scrollY = window.scrollY;
    
    // Adiciona a classe que trava o scroll
    document.body.classList.add('overflow-hidden');
    
    // Compensa o espaço da barra de rolagem
    document.body.style.paddingRight = '15px';
    
    // Força a posição do scroll
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';

    return () => {
      // Remove a classe que trava o scroll
      document.body.classList.remove('overflow-hidden');
      
      // Remove o padding
      document.body.style.paddingRight = '';
      
      // Restaura a posição do scroll
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restaura a posição do scroll
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    let element = document.getElementById(modalId);
    if (!element) {
      element = document.createElement('div');
      element.id = modalId;
      document.body.appendChild(element);
    }
    setModalRoot(element);

    return () => {
      if (element && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [modalId]);

  const handleOutsideClick = (e: any) => {
    if (animate) {
      setTimeout(() => {
        if (e.target.id === modalId) {
          onClose();
        }
      }, 5000);
    } else {
      if (e.target.id === modalId) {
        onClose();
      }
    }
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <div
      aria-hidden="true"
      id={modalId}
      onClick={(e) => handleOutsideClick(e)}
      className={`${
        styleExternal ? styleExternal : 'bg-black/40'
      } flex justify-center items-center max-w-full  w-full md:w-screen h-full fixed  top-0 right-0 z-40 `}
    >
      <div
        id="internal_modal"
        className={twMerge(
          `absolute z-50 flex justify-start items-start  md:rounded-md overflow-hidden scrollbar-none  `,
          styleInternal,
        )}
      >
        {children}
      </div>
    </div>,
    modalRoot,
  );
}

/*  */