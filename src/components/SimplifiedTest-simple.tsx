import React from 'react';
import widgemoExamples from '../data/widgemoExamples';

export const SimplifiedTest: React.FC = () => {
  console.log('🚀 SimplifiedTest component rendering');

  try {
    // Test if widgemoExamples can be imported
    console.log('Testing widgemoExamples import...');
    const examples = widgemoExamples;
    console.log('widgemoExamples loaded:', examples?.length, 'examples');

    return (
      <div style={{ padding: '2rem', backgroundColor: 'lightblue', minHeight: '100vh' }}>
        <h1>✅ Full Component Test</h1>
        <p>Component is rendering successfully.</p>
        <p>Examples loaded: {examples?.length || 'undefined'}</p>
        <p>Time: {new Date().toLocaleTimeString()}</p>
      </div>
    );
  } catch (error) {
    console.error('❌ Error in SimplifiedTest:', error);
    return (
      <div style={{ padding: '2rem', backgroundColor: 'red', color: 'white' }}>
        <h1>❌ Error in SimplifiedTest</h1>
        <p>{error instanceof Error ? error.message : 'Unknown error'}</p>
        <pre>{error instanceof Error ? error.stack : JSON.stringify(error)}</pre>
      </div>
    );
  }
};