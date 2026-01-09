import { useState, useEffect } from 'react';
import { AppNavbar } from './components/Navbar';
import { TeaserSection } from './components/TeaserSection';
import { GallerySection } from './components/GallerySection';
import { SandboxSection } from './components/SandboxSection';
import { AdvancedSection } from './components/AdvancedSection';
import { ResourcesSection } from './components/ResourcesSection';
import { defaultSandboxConfig, teaserSampleData } from './data/sampleData';
import type { WidgemoConfig } from 'widgemo-core';
import type { SampleData } from './data/sampleData';
import { injectThemeCSS } from './utils/themeConfig';
import './App.css';

// Main App component
function App() {
  const [activeSection, setActiveSection] = useState('teaser');
  const [currentTheme, setCurrentTheme] = useState(() => {
    // Detect system preference for light/dark theme
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'theme-dark' : 'theme-light';
    }
    return 'theme-light'; // fallback
  });

  // Inject theme CSS on app load
  useEffect(() => {
    injectThemeCSS();
  }, []);

  // Sandbox state management
  const [sandboxConfig, setSandboxConfig] = useState(defaultSandboxConfig);
  const [sandboxData, setSandboxData] = useState<Record<string, unknown>[]>(teaserSampleData);

  // Determine if current theme should have dark teaser text
  const shouldHaveDarkTeaserText = currentTheme.startsWith('theme-light');

  // Handle scroll to update active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['teaser', 'gallery', 'sandbox', 'advanced', 'resources'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // Gallery integration callbacks
  const loadConfigToSandbox = (config: WidgemoConfig, data?: SampleData[]) => {
    setSandboxConfig(config);
    if (data) {
      setSandboxData(data as Record<string, unknown>[]);
    }
  };

  return (
    <div className={`App ${currentTheme}`}>
      <AppNavbar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      <TeaserSection
        onExploreGallery={() => scrollToSection('gallery')}
        onJumpToSandbox={() => scrollToSection('sandbox')}
        shouldHaveDarkText={shouldHaveDarkTeaserText}
        currentTheme={currentTheme}
      />

      <GallerySection onLoadToSandbox={loadConfigToSandbox} currentTheme={currentTheme} />

      <SandboxSection
        initialConfig={sandboxConfig}
        initialData={sandboxData}
        onConfigChange={setSandboxConfig}
        onDataChange={setSandboxData}
        currentTheme={currentTheme}
      />

      <AdvancedSection currentTheme={currentTheme} />

      <ResourcesSection />
    </div>
  );
}

export default App;
