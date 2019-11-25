import React from 'react';
import { StoreProvider } from './components/StoreProvider';
import { MainComponent } from './components/MainComponent';

const App: React.FC = () => {
  return (
    <StoreProvider>
      <MainComponent/>
    </StoreProvider>
  );
}

export default App;
