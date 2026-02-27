import { useState } from 'react';
import { Plus } from 'lucide-react';

const ConnectionLine = ({ isShort = false }: { isShort?: boolean }) => {
  const [isHovering, setIsHovering] = useState(false);

  if (isShort) {
    return <div className="w-px bg-gray-300" style={{ height: '24px' }}></div>;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="w-px bg-gray-300" style={{ height: '24px' }}></div>
      <div
        className="rounded flex items-center justify-center cursor-pointer hover:shadow-sm transition-all duration-200"
        style={{
          width: isHovering ? '24px' : '12px',
          height: isHovering ? '24px' : '12px',
          backgroundColor: isHovering ? '#8C95A8' : '#d1d5db',
          borderRadius: isHovering ? '6px' : '50%',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {isHovering && <Plus className="w-4 h-4 text-white" strokeWidth={3} />}
      </div>
      <div className="w-px bg-gray-300" style={{ height: '24px' }}></div>
    </div>
  );
};

export default ConnectionLine;
