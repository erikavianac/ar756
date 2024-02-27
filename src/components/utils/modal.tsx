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

  const modalRoot = document?.getElementById(modalId) ?? document?.createElement('div');

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