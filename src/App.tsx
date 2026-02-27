import { useState } from 'react';
import Header from './components/Header';
import Canvas from './components/Canvas';

function App() {
  const [activeTab, setActiveTab] = useState('map');

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50 overflow-hidden">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <Canvas activeTab={activeTab} />
    </div>
  );
}

export default App;
