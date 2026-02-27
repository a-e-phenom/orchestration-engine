import { Radio, Layers, Clock } from 'lucide-react';

const MapWidget = () => {
  const stages = [
    { label: 'Application', count: 18, borderColor: 'border-green-300', iconColor: '#16a34a', time: '8m' },
    { label: 'Screening', count: 12, borderColor: 'border-green-300', iconColor: '#16a34a', time: '2h' },
    { label: 'Interview', count: 287, borderColor: 'border-orange-300', iconColor: '#ea580c', time: '4.1d' },
    { label: 'Offer', count: 2, borderColor: 'border-green-300', iconColor: '#16a34a', time: '1d' }
  ];

  return (
    <div className="rounded-lg border border-gray-200 p-6 relative overflow-hidden" style={{ backgroundColor: '#f9fafb', backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="relative">
        {/* Center vertical dotted line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px)' }}></div>

        <div className="space-y-8">
          {stages.map((stage, idx) => (
            <div key={idx} className="relative flex justify-center">
              <div className="relative">
                <div className="absolute -top-4 -left-6 z-50 px-2 py-1 flex items-center gap-2 shadow-sm rounded-md" style={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }}>
                  <Radio className="w-4 h-4" style={{ color: stage.iconColor }} fill="currentColor" />
                  <span className="text-xs font-semibold text-gray-900">{stage.count}</span>
                </div>

                {idx > 0 && (
                  <div className="absolute -top-4 left-1/2 translate-x-3 flex items-center gap-1.5" style={{ transform: 'translateY(-50%)' }}>
                    <Clock className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600">{stage.time}</span>
                  </div>
                )}

                <div className={`bg-white border-2 ${stage.borderColor} rounded-lg px-4 py-3 w-56 flex items-center gap-3 shadow-sm relative z-10`}>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-lg" style={{ backgroundColor: '#F4F6FA' }}>
                    <Layers className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-600">1</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{stage.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapWidget;
