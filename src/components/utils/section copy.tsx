import { ReactNode } from 'react';

interface SectionProps {
  classname?: string;
  children: ReactNode;
}

export function SectionComponent({ children, classname }: SectionProps) {
  return (
    <section className={`min-h-screen h-full w-full min-w-screen relative ${classname}`}>
      {children}
    </section>
  );
}
