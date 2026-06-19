import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { ThemeToggle } from './ThemeToggle';

interface AppNavbarProps {
  topOffset?: number;
}

export const AppNavbar: React.FC<AppNavbarProps> = ({ topOffset = 0 }) => {
  const location = useLocation();
  const isSandbox = location.pathname === '/sandbox';

  const isApplicationsActive =
    location.pathname === '/applications' ||
    location.pathname === '/dashboard' ||
    location.pathname === '/cashflow-dashboard';

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
      <BootstrapNavbar bg="dark" variant="dark" fixed="top" expand="lg" className="shadow" style={{ top: `${topOffset}px` }}>
        <BootstrapNavbar.Brand 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          as={Link as any} 
          to="/" 
          className="d-flex align-items-center ms-4"
        >
          <img src="/widgemo_deco.svg" alt="Widgemo" className="me-2" style={{ height: '32px', width: 'auto' }} />
          <div className="d-flex flex-column">
            <strong>Widgemo</strong>
            {(window.location?.port === '5173' || window.location.hostname === 'dev.widgemo.com') && (
              <small className="text-warning opacity-75" style={{ fontSize: '0.65rem', lineHeight: '1', marginTop: '-2px' }}>
                DEVELOPMENT MODE
              </small>
            )}
          </div>
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="demo-nav" />
        <BootstrapNavbar.Collapse id="demo-nav" className='me-4'>
          <div className="d-flex justify-content-end align-items-center w-100">
            <Nav className="mb-0 me-3">
              <Nav.Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                as={Link as any}
                to="/"
                active={location.pathname === '/'}
                className="mx-2"
              >
                Overview
              </Nav.Link>
              <Nav.Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                as={Link as any}
                to="/examples"
                active={location.pathname === '/examples'}
                className="mx-2"
              >
                Examples
              </Nav.Link>

              <NavDropdown
                title="Applications"
                id="applications-nav-dropdown"
                className="mx-2"
                active={isApplicationsActive}
              >
                <NavDropdown.Item
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  as={Link as any}
                  to="/applications"
                >
                  Overview
                </NavDropdown.Item>
                <NavDropdown.Item
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  as={Link as any}
                  to="/dashboard"
                >
                  Team Portfolio
                </NavDropdown.Item>
                <NavDropdown.Item
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  as={Link as any}
                  to="/cashflow-dashboard"
                >
                  Finance Tracker
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                as={Link as any}
                to="/sandbox"
                active={location.pathname === '/sandbox'}
                className="mx-2"
              >
                Sandbox
              </Nav.Link>
              <Nav.Link
                href="https://docs.widgemo.com/core"
                target="_blank"
                rel="noopener noreferrer"
                className="mx-2"
              >
                Docs
              </Nav.Link>
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
            <ThemeToggle />
          </div>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </div>
  );
};