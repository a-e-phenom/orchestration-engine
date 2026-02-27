import { ChevronLeft, Network, Radio, Sparkles, BarChart3, Circle, Save, MoreVertical } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header = ({ activeTab, onTabChange }: HeaderProps) => {
  const tabs = [
    { id: 'map', label: 'Map', icon: Network },
    { id: 'operation', label: 'Operation', icon: Radio },
    { id: 'workroom', label: 'Workroom', icon: Sparkles },
    { id: 'data', label: 'Data', icon: BarChart3 },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-[24px] flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button className="w-6 h-6 flex items-center justify-center rounded-md hover:opacity-80 transition-opacity" style={{ borderColor: '#8C95A8', borderWidth: '1px' }}>
          <ChevronLeft className="w-4 h-4 text-gray-700" />
        </button>
        <h1 className="text-gray-800 font-medium">Hiring Motion - ICU Nurses</h1>
      </div>

     <div className="flex-1 flex justify-center h-16">
  <nav className="flex items-center gap-8 h-full">
    {tabs.map((tab) => {
      const Icon = tab.icon;
      const isActive = activeTab === tab.id;

      return (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex items-center gap-2 text-sm h-full relative transition-colors"
        >
          <Icon
            className={`w-4 h-4 ${
              isActive ? 'text-gray-900' : 'text-gray-600'
            }`}
          />

          <span
            className={
              isActive ? 'text-gray-900 font-medium' : 'text-gray-600'
            }
          >
            {tab.label}
          </span>

          {isActive && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#4D3EE0]" />
          )}
        </button>
      );
    })}
  </nav>
</div>


      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 px-4 h-10 bg-white text-gray-700 rounded text-sm font-medium hover:opacity-80 transition-opacity" style={{ borderColor: '#8C95A8', borderWidth: '1px', borderRadius: '10px' }}>
          <Circle className="w-2.5 h-2.5 fill-[#00875A]" />
          Live
        </button>
        <button className="px-4 h-10 bg-gray-100 text-gray-400 rounded text-sm font-medium hover:bg-gray-200 transition-colors" style={{ borderRadius: '10px' }}>
          Save
        </button>
        <button className="w-10 h-10 flex items-center justify-center hover:opacity-80 transition-opacity" style={{ borderColor: '#8C95A8', borderWidth: '1px', borderRadius: '10px' }}>
          <MoreVertical className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
