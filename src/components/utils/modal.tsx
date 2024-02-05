'use client';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { twMerge } from 'tailwind-merge';
export interface PropsNewModal {
  children: any;
  onClose: any;
  animate?: boolean;
  styleExternal?: string;
  styleInternal?: string;
}

export function ModalComponent({
  onClose,
  children,
  styleExternal,
  styleInternal,
  animate,
}: PropsNewModal) {
  const handleOutsideClick = (e: any) => {
    if (animate) {
      setTimeout(() => {
        if (e.target.id === 'modal-root') {
          onClose();
        }
      }, 5000);
    } else {
      if (e.target.id === 'modal-root') {
        onClose();
      }
    }
  };

  const modalRoot = document?.getElementById('modal-root') ?? document?.createElement('div');

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
  }, []);

  return ReactDOM.createPortal(
    <div
      aria-hidden="true"
      id={'modal-root'}
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