import { ChevronLeft, ChevronRight, MoreVertical, ArrowDown, ArrowRight, CheckCircle, Clock, AlertCircle, Bell, Flag, ClipboardList } from 'lucide-react';
import { WorkItem } from './Workroom';

interface WorkItemDetailProps {
  item: WorkItem;
  onBack: () => void;
}

const WorkItemDetail = ({ item, onBack }: WorkItemDetailProps) => {
  const activities = [
    { title: 'Entered Application Flow', subtitle: 'Entered Application Flow', icon: ArrowDown, color: '#16a34a', bg: '#dcfce7', time: '5d' },
    { title: 'Routed to Screening Stage', subtitle: 'Default routing', icon: ArrowRight, color: '#4338ca', bg: '#ede9fe', time: '4d' },
    { title: 'Entered Pre-Qualification Questionnaire', subtitle: 'Default routing', icon: ArrowDown, color: '#4338ca', bg: '#ede9fe', time: '4d' },
    { title: 'Submitted Pre-Qualification Questionnaire', subtitle: 'Default routing', icon: CheckCircle, color: '#4338ca', bg: '#ede9fe', time: '4d' },
    { title: 'Routed to Screening Stage', subtitle: 'Condition-based routing', icon: ArrowRight, color: '#4338ca', bg: '#ede9fe', time: '4d' },
    { title: 'ACLS Certification Upload', subtitle: 'In progress', icon: Clock, color: '#ea580c', bg: '#fed7aa', time: '4d' }
  ];

  const agentActions = [
    { title: 'Identified flow blockage', subtitle: 'ACLS Certification Upload', icon: AlertCircle, color: '#dc2626', bg: '#fee2e2', time: '4d' },
    { title: 'Sent Reminder to Candidate', subtitle: 'Upload ACLS Certification to continue', icon: Bell, color: '#2563eb', bg: '#dbeafe', time: '4d' },
    { title: 'Sent Notification to Recruiter', subtitle: 'Candidate blocked because of missing certificate', icon: Bell, color: '#2563eb', bg: '#dbeafe', time: '4d' },
    { title: 'Hold Interview Slot for Pending Candidate', subtitle: 'Hold Maria\'s interview slot for 48 hours', icon: Flag, color: '#7c3aed', bg: '#ede9fe', time: '4d' },
    { title: 'Await upload', subtitle: 'Wait for 24 hours', icon: Clock, color: '#7c3aed', bg: '#ede9fe', time: '4d' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-50 text-green-700 border-green-200';
      case 'in_progress': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'completed': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white px-6 py-5 flex-shrink-0">
        <div className="flex items-start justify-between gap-4 mb-4">
          <button onClick={onBack} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <h1 className="flex-1 text-lg font-semibold text-gray-900">{item.title}</h1>
          <div className="flex items-center gap-2">
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronLeft className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </button>
            <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Maria T</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Chicago</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>Mar 12, 12:00</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-600"></span>
            <span className="text-sm font-medium text-gray-900">Open</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-6 py-6 max-w-3xl mx-auto">
          {/* Summary */}
          <div className="mb-8 bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700 leading-relaxed">
              Screening complete, but missing required ACLS certification. Reminder sent on Day 4, recruiter notified, interview slot held for 48 hours.
            </p>
          </div>

          {/* Activity Log */}
          <div className="mb-12">
            <h2 className="text-sm font-semibold text-gray-900 mb-6">Activity log</h2>
            <div className="space-y-4">
              {activities.map((activity, idx) => {
                const IconComponent = activity.icon;
                return (
                  <div key={idx} className="flex gap-4 justify-between items-start">
                    <div className="flex gap-4 flex-1">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8" style={{ backgroundColor: activity.bg, borderRadius: '10px' }}>
                          <IconComponent className="w-4 h-4" style={{ color: activity.color }} />
                        </div>
                        {idx < activities.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="pt-1 pb-4">
                        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{activity.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 pt-1 flex-shrink-0">{activity.time}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Orchestration Agent Actions */}
          <div>
            <h2 className="text-sm font-semibold text-gray-900 mb-6">Orchestration Agent Actions</h2>
            <div className="space-y-4">
              {agentActions.map((action, idx) => {
                const IconComponent = action.icon;
                return (
                  <div key={idx} className="flex gap-4 justify-between items-start">
                    <div className="flex gap-4 flex-1">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center w-8 h-8" style={{ backgroundColor: action.bg, borderRadius: '10px' }}>
                          <IconComponent className="w-4 h-4" style={{ color: action.color }} />
                        </div>
                        {idx < agentActions.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 mt-2"></div>
                        )}
                      </div>
                      <div className="pt-1 pb-4">
                        <p className="text-sm font-medium text-gray-900">{action.title}</p>
                        <p className="text-xs text-gray-600 mt-0.5">{action.subtitle}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 pt-1 flex-shrink-0">{action.time}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkItemDetail;
