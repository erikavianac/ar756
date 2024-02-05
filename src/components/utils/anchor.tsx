import React, { ReactNode } from 'react';

interface AnchorProps {
  icon?: ReactNode;
  bgColor?: string;
  href: string;
}

export default function AnchorComponent({ bgColor, icon, href }: AnchorProps) {
  return (
    <div className={`flex gap-x-2 items-center justify-center p-1 ${bgColor} rounded-[4px]`}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
      >
        {icon}
      </a>
    </div>
  );
}
