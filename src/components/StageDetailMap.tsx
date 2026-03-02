import { ArrowLeft, GitCompareArrows, Zap, FileText, BarChart3 } from 'lucide-react';
import ConnectionLine from './ConnectionLine';

interface StageDetailMapProps {
  stageName: string;
  onBack: () => void;
}

const StageDetailMap = ({ stageName, onBack }: StageDetailMapProps) => {
  const activities = [
    { id: 1, label: 'Candidate Evaluation', type: 'automation', icon: Zap },
    { id: 2, label: 'Document Review', type: 'activity', icon: FileText },
    { id: 3, label: 'Interview Setup', type: 'automation', icon: BarChart3 },
    { id: 4, label: 'Feedback Collection', type: 'activity', icon: FileText }
  ];

  return (
    <div className="flex-1 overflow-auto relative flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 flex items-center h-16 flex-shrink-0">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 -ml-2">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <h1 className="text-lg font-semibold text-gray-900 ml-4">{stageName}</h1>
      </header>

      <div className="flex-1 overflow-auto relative" style={{
        backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '24px 24px',
        backgroundColor: '#f9fafb'
      }}>
        <div className="p-8 flex flex-col items-center min-h-full">
        <div className="max-w-4xl mx-auto w-full flex flex-col items-center">
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
            <div className="flex flex-col gap-0" style={{ width: '280px' }}>
              {activities.map((activity, index) => {
                const ActivityIcon = activity.icon;
                return (
                  <div key={activity.id} className="flex flex-col gap-0">
                    <button className="bg-white border border-gray-200 rounded-xl shadow-xs hover:border-indigo-700 transition-colors">
                      <div className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center p-2 rounded-lg" style={{ backgroundColor: '#EAE8FB' }}>
                            <ActivityIcon className="w-4 h-4" style={{ color: '#5E48B8' }} />
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
                );
              })}
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
