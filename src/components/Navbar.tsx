import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Button } from 'react-bootstrap';
import { ThemeContext } from '../contexts/ThemeContext';
import { ThemeSelector } from './ThemeSelector';

export const AppNavbar: React.FC = () => {
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext);
  const location = useLocation();
  const isSandbox = location.pathname === '/sandbox';

  const sections = [
    { id: 'teaser', label: 'Teaser', path: '/' },
    { id: 'anatomy', label: 'Anatomy', path: '/' },
    { id: 'gallery', label: 'Gallery', path: '/' },
    { id: 'sandbox', label: 'Sandbox', path: '/sandbox' },
    { id: 'advanced', label: 'Advanced', path: '/' },
    { id: 'resources', label: 'Resources', path: '/' },
  ];

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on main page, navigate first
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <BootstrapNavbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow">
        <BootstrapNavbar.Brand 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          as={Link as any} 
          to="/" 
          className="d-flex align-items-center ms-4"
        >
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
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  as={Link as any}
                  to={section.path}
                  active={location.pathname === section.path && (section.id === 'sandbox' ? isSandbox : !isSandbox)}
                  onClick={() => section.path === '/' && scrollToSection(section.id)}
                  className="mx-2"
                >
                  {section.label}
                </Nav.Link>
              ))}
            </Nav>
            {isSandbox && (
              <Button 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                as={Link as any} 
                to="/" 
                variant="outline-light" 
                size="sm" 
                className="me-3"
              >
                ← Back to Main
              </Button>
            )}
            <ThemeSelector currentTheme={currentTheme} onThemeChange={setCurrentTheme} />
          </div>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};