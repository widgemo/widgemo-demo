import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { TeaserSection } from './TeaserSection';
import { AnatomySection } from './AnatomySection';
import { GallerySection } from './GallerySection';
import { AdvancedSection } from './AdvancedSection';
import { ResourcesSection } from './ResourcesSection';

export const MainPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  // Determine if current theme should have dark teaser text
  const shouldHaveDarkTeaserText = currentTheme === 'light';

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 56; // Bootstrap navbar height
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({ top: elementPosition, behavior: 'smooth' });
    }
  };

   
  const handleLoadToSandbox = (configId: string) => {
    // Navigate to sandbox with config param
    navigate(`/sandbox?config=${configId}`);
  };

  return (
    <div style={{ 
      paddingTop: '60px', 
      minHeight: '100vh'
    }}>
      <TeaserSection
        onExploreGallery={() => scrollToSection('gallery')}
        onJumpToSandbox={() => navigate('/sandbox')}
        shouldHaveDarkText={shouldHaveDarkTeaserText}
      />

      <AnatomySection />

      <GallerySection onLoadToSandbox={handleLoadToSandbox} currentTheme={currentTheme} />

      <AdvancedSection currentTheme={currentTheme} />

      <ResourcesSection />
    </div>
  );
};