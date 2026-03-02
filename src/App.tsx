import { useState } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';

function App() {
  const [activeTab, setActiveTab] = useState('map');
  const [selectedStage, setSelectedStage] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <Canvas activeTab={activeTab} selectedStage={selectedStage} onStageSelect={setSelectedStage} />
    </div>
  );
}

export default App;
