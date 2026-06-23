import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { TeaserSection, AnatomySection, AdvancedSection, ResourcesSection } from './main-page';

export const MainPage: React.FC = () => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  // Determine if current theme should have dark teaser text
  const shouldHaveDarkTeaserText = currentTheme === 'light';

  return (
    <div style={{ minHeight: '100vh' }}>
      <TeaserSection
        onExploreExamples={() => navigate('/examples')}
        onJumpToSandbox={() => navigate('/sandbox')}
        shouldHaveDarkText={shouldHaveDarkTeaserText}
      />

      <AnatomySection />

      <section className="section-block theme-aware-section">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 text-center">
          <div className="section-header">
            <h2 className="section-title theme-aware-text">See It Working</h2>
            <p className="section-subtitle theme-aware-text">
              17 curated examples — each one a real Widgemo config you can open in the Sandbox and edit live.
            </p>
          </div>
          <Button
            variant="primary"
            onClick={() => navigate('/examples')}
            style={{ backgroundColor: '#5f4b8b', borderColor: '#5f4b8b', padding: '0.6rem 2rem', fontSize: '1rem' }}
          >
            Browse Examples →
          </Button>
        </div>
      </section>

      <AdvancedSection currentTheme={currentTheme} />

      <ResourcesSection />
    </div>
  );
};