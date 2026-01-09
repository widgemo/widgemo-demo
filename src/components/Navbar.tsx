import React from 'react';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { ThemeSelector } from './ThemeSelector';

interface AppNavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({
  activeSection,
  onSectionChange,
  currentTheme,
  onThemeChange
}) => {
  const sections = [
    { id: 'teaser', label: 'Teaser' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'sandbox', label: 'Sandbox' },
    { id: 'advanced', label: 'Advanced' },
    { id: 'resources', label: 'Resources' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
      onSectionChange(sectionId);
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <BootstrapNavbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow">
        <BootstrapNavbar.Brand href="#teaser" onClick={() => scrollToSection('teaser')} className="d-flex align-items-center ms-4">
          <img src="/widgemo_deco.svg" alt="Widgemo" className="me-2" style={{ height: '32px', width: 'auto' }} />
          <strong>Widgemo</strong>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="demo-nav" />
        <BootstrapNavbar.Collapse id="demo-nav" className='me-4'>
          <div className="d-flex justify-content-end align-items-center w-100">
            <Nav className="mb-0 me-3">
              {sections.map(section => (
                <Nav.Link
                  key={section.id}
                  active={activeSection === section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="mx-2"
                >
                  {section.label}
                </Nav.Link>
              ))}
            </Nav>
            <ThemeSelector currentTheme={currentTheme} onThemeChange={onThemeChange} />
          </div>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};