import React from 'react';
import { GrFormClose } from 'react-icons/gr';

interface CloseButtonProps {
  handleCloseModal: () => void;
}

export default function CloseButtonComponent({ handleCloseModal }: CloseButtonProps) {
  return (
    <div
      className="absolute transition duration-300 rounded-full cursor-pointer top-3 right-3 hover:bg-gray-300"
      onClick={handleCloseModal}
    >
      <GrFormClose />
    </div>
  );
}
