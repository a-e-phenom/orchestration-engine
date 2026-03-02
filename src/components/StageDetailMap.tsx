import { ArrowLeft, GitCompareArrows, Zap } from 'lucide-react';
import ConnectionLine from './ConnectionLine';

interface StageDetailMapProps {
  stageName: string;
  onBack: () => void;
}

const StageDetailMap = ({ stageName, onBack }: StageDetailMapProps) => {
  const activities = [
    { id: 1, label: 'Candidate Evaluation', type: 'automation' },
    { id: 2, label: 'Document Review', type: 'activity' },
    { id: 3, label: 'Interview Setup', type: 'automation' },
    { id: 4, label: 'Feedback Collection', type: 'activity' }
  ];

  return (
    <div className="flex-1 overflow-auto relative flex flex-col" style={{
      backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      backgroundColor: '#f9fafb'
    }}>
      <div className="border-b border-[#E8EAEE]"></div>

      <div className="p-8 flex flex-col items-center min-h-full">
        <div className="max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-semibold text-gray-900">{stageName}</h1>
          </div>

          <div className="flex flex-col items-center">
            {/* Rule Evaluation Header */}
            <div className="mb-0">
              <button className="bg-white rounded-xl px-3 pb-2 pt-2.5 shadow-sm hover:bg-gray-50 transition-all w-full text-left border border-[#E8EAEE]" style={{
                boxShadow: 'inset 0 3px 0 0 #BA4800'
              }}>
                <div className="flex items-center gap-2">
                  <GitCompareArrows className="w-5 h-5" style={{ color: '#BA4800' }} />
                  <span className="text-sm font-medium text-gray-700">Rule Evaluation</span>
                </div>
              </button>
            </div>

            <ConnectionLine />

            {/* Activities */}
            <div className="flex flex-col gap-0" style={{ width: '264px' }}>
              {activities.map((activity, index) => (
                <div key={activity.id} className="flex flex-col gap-0">
                  <button className="bg-white border border-gray-200 rounded-xl shadow-xs hover:border-indigo-700 transition-colors">
                    <div className="flex items-center justify-between p-3">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: '#F4F6FA' }}>
                          <Zap className="w-4 h-4 text-gray-600" />
                          <span className="text-sm font-medium text-gray-600">{index + 1}</span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">{activity.label}</span>
                      </div>
                      <span className="text-xs px-2 py-1 rounded" style={{
                        backgroundColor: activity.type === 'automation' ? '#EDE9FE' : '#F3F4F6',
                        color: activity.type === 'automation' ? '#5E48B8' : '#6B7280'
                      }}>
                        {activity.type === 'automation' ? 'Automated' : 'Manual'}
                      </span>
                    </div>
                  </button>
                  {index < activities.length - 1 && <ConnectionLine />}
                </div>
              ))}
            </div>

            {/* End Card */}
            <div className="flex flex-col items-center gap-0">
              <ConnectionLine isShort />
              <div className="bg-white rounded-xl px-3 pb-2 pt-2.5 shadow-sm w-full text-left border border-[#E8EAEE]" style={{
                boxShadow: 'inset 0 3px 0 0 #22c55e'
              }}>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
                  <span className="text-sm font-medium text-gray-700">End</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageDetailMap;
