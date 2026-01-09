import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { ThemeSelector } from './ThemeSelector';

interface DemoNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export const DemoNav: React.FC<DemoNavProps> = ({
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
    <Navbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow">
      <Container>
        <Navbar.Brand href="#teaser" onClick={() => scrollToSection('teaser')}>
          <img src="/widgemo_deco.svg" alt="Widgemo" className="me-2" style={{ height: '32px', width: 'auto' }} />
          <strong>Widgemo</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="demo-nav" />
        <Navbar.Collapse id="demo-nav">
          <Nav className="ms-auto">
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};