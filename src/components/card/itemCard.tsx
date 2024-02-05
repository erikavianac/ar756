import React from 'react';

interface CompodidadesProps {
  title: string;
  className?: string;
  icon: React.ReactNode;
}

export function ItemCardComponent({ icon, title, className }: CompodidadesProps) {
  return (
    <div className={`flex justify-start items-center gap-x-6 ${className}`}>
      {icon}
      <p className="flex items-center justify-center text-center align-text-bottom">{title}</p>
    </div>
  );
}
