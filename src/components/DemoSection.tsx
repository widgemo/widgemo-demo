import React from 'react';

interface DemoSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ id, title, subtitle, children, className = '' }) => (
  <section id={id} className={`py-5 theme-aware-section ${className}`}>
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold mb-3">{title}</h2>
        {subtitle && <p className="lead">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);