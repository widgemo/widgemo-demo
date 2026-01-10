import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import { TeaserSection } from './TeaserSection';
import { GallerySection } from './GallerySection';
import { AdvancedSection } from './AdvancedSection';
import { ResourcesSection } from './ResourcesSection';
import { galleryConfigs } from '../data/sampleData';
import type { WidgemoConfig } from 'widgemo-core';
import type { SampleData } from '../data/sampleData';

export const MainPage: React.FC = () => {
  const { currentTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Determine if current theme should have dark teaser text
  const shouldHaveDarkTeaserText = currentTheme.startsWith('theme-light');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadToSandbox = (config: WidgemoConfig, _data?: SampleData[]) => {
    // Navigate to sandbox with config param
    const configId = galleryConfigs.find(item => item.config === config)?.id;
    if (configId) {
      navigate(`/sandbox?config=${configId}`);
    } else {
      navigate('/sandbox');
    }
  };

  return (
    <div style={{ paddingTop: '60px' }}>
      <TeaserSection
        onExploreGallery={() => scrollToSection('gallery')}
        onJumpToSandbox={() => navigate('/sandbox')}
        shouldHaveDarkText={shouldHaveDarkTeaserText}
        currentTheme={currentTheme}
      />

      <GallerySection onLoadToSandbox={handleLoadToSandbox} currentTheme={currentTheme} />

      <AdvancedSection currentTheme={currentTheme} />

      <ResourcesSection />
    </div>
  );
};