import { useMemo, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { SandboxSection } from './SandboxSection';
import { defaultSandboxConfig, teaserSampleData, galleryConfigs } from '../data/sampleData';
import { mergeThemeIntoConfig } from '../utils/themeUtils';

export const SandboxPage: React.FC = () => {
  const { currentTheme } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();

  // Get initial config from URL params
  const initialConfig = useMemo(() => {
    const configId = searchParams.get('config');
    if (configId) {
      const configItem = galleryConfigs.find(item => item.id === configId);
      if (configItem) {
        return mergeThemeIntoConfig(configItem.config, currentTheme);
      }
    }
    return mergeThemeIntoConfig(defaultSandboxConfig, currentTheme);
  }, [searchParams, currentTheme]);

  const initialData = useMemo(() => {
    const configId = searchParams.get('config');
    if (configId) {
      const configItem = galleryConfigs.find(item => item.id === configId);
      return configItem?.data || teaserSampleData;
    }
    return teaserSampleData;
  }, [searchParams]);

  return (
    <div className={`${currentTheme}`} style={{ 
      position: 'fixed',
      top: '56px', // Account for navbar height
      left: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: 'calc(100vh - 56px)',
      overflow: 'hidden'
    }}>
      <SandboxSection
        key={searchParams.get('config') || 'default'}
        initialConfig={initialConfig}
        initialData={initialData}
        currentTheme={currentTheme}
      />
    </div>
  );
};