import React from 'react';
import { Container } from 'react-bootstrap';

interface DemoSectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export const DemoSection: React.FC<DemoSectionProps> = ({ id, title, subtitle, children, className = '' }) => (
  <section id={id} className={`py-5 theme-aware-section ${className}`}>
    <Container>
      <div className="text-center mb-5">
        <h2 className="display-4 fw-bold mb-3">{title}</h2>
        {subtitle && <p className="lead">{subtitle}</p>}
      </div>
      {children}
    </Container>
  </section>
);