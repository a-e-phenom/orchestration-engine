import { useState } from 'react';
import { Search, Filter, ChevronRight, AlertCircle, Clock, User, MapPin, Briefcase, Maximize2, Plus, Mic, ArrowUp, Sparkles } from 'lucide-react';
import InsightCard from './InsightCard';
import WorkItemDetail from './WorkItemDetail';

export interface WorkItem {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'completed';
  assignee: string;
  location: string;
  role: string;
  daysOpen: number;
  notes: string;
  actions: number;
}

const Workroom = () => {
  const [workItems] = useState<WorkItem[]>([
    {
      id: '1',
      title: 'Screening complete, but missing ACLS Certificate',
      status: 'open',
      assignee: 'Maria T',
      location: 'Chicago',
      role: 'ICU Nurse',
      daysOpen: 4,
      notes: 'Reminder was sent to the candidate and Notification was sent to the recruiter. Holding the interview slot for 48h.',
      actions: 4
    },
    {
      id: '2',
      title: 'Screening complete, but missing ACLS Certificate',
      status: 'open',
      assignee: 'Maria T',
      location: 'Chicago',
      role: 'ICU Nurse',
      daysOpen: 4,
      notes: 'Reminder was sent to the candidate and Notification was sent to the recruiter. Holding the interview slot for 48h.',
      actions: 4
    },
    {
      id: '3',
      title: 'Screening complete, but missing ACLS Certificate',
      status: 'open',
      assignee: 'Maria T',
      location: 'Chicago',
      role: 'ICU Nurse',
      daysOpen: 4,
      notes: 'Reminder was sent to the candidate and Notification was sent to the recruiter. Holding the interview slot for 48h.',
      actions: 4
    },
    {
      id: '4',
      title: 'Screening complete, but missing ACLS Certificate',
      status: 'open',
      assignee: 'Maria T',
      location: 'Chicago',
      role: 'ICU Nurse',
      daysOpen: 4,
      notes: 'Reminder was sent to the candidate and Notification was sent to the recruiter. Holding the interview slot for 48h.',
      actions: 4
    },
    {
      id: '5',
      title: 'Screening complete, but missing ACLS Certificate',
      status: 'open',
      assignee: 'Maria T',
      location: 'Chicago',
      role: 'ICU Nurse',
      daysOpen: 4,
      notes: 'Reminder was sent to the candidate and Notification was sent to the recruiter. Holding the interview slot for 48h.',
      actions: 4
    },
    {
      id: '6',
      title: 'Screening complete, but missing ACLS Certificate',
      status: 'open',
      assignee: 'Maria T',
      location: 'Chicago',
      role: 'ICU Nurse',
      daysOpen: 4,
      notes: 'Reminder was sent to the candidate and Notification was sent to the recruiter. Holding the interview slot for 48h.',
      actions: 4
    }
  ]);

  const [selectedItem, setSelectedItem] = useState<WorkItem | null>(null);
  const openCount = workItems.filter(item => item.status === 'open').length;
  const completedCount = workItems.filter(item => item.status === 'completed').length;

  if (selectedItem) {
    return <WorkItemDetail item={selectedItem} onBack={() => setSelectedItem(null)} />;
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
      {/* Main Layout */}
      <div className="flex-1 overflow-hidden flex gap-0">
        {/* Left Panel - Insights */}
        <div className="w-[420px] flex-shrink-0 bg-white border-r border-gray-200 overflow-y-auto p-6 flex flex-col">
          <h2 className="text-sm font-semibold text-gray-900 mb-6">Insights</h2>

          <div className="space-y-5">
            <InsightCard
              title="Charge Nurse approval pending"
              count={12}
              description="Approvals are pending for more than 7 days because the Hiring Manager is unresponsive."
              recommendation="Recommendation:"
              recommendationLink="Reassign to Deputy Charge Nurse"
              primaryAction="Approve"
              secondaryAction="Reject"
            />
            <InsightCard
              title="Interview scheduling blocked"
              count={8}
              description="3 candidates are waiting for interview slots but none are available for the next 5 days."
              recommendation="Recommendation:"
              recommendationLink="Open additional interview slots"
              primaryAction="Schedule"
              secondaryAction="Defer"
            />
          </div>
        </div>

        {/* Center - Work Items List */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Top Bar */}
          <div className="border-b border-gray-200 bg-white px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium bg-violet-50 border-0">
                  Open <span className="ml-1 font-semibold px-2 py-0.5 rounded bg-white text-gray-700">{openCount}</span>
                </button>
                <button className="px-3 py-1.5 rounded-lg text-sm font-medium border border-gray-300 text-gray-900 hover:bg-gray-50">
                  Saved <span className="ml-1 font-semibold px-2 py-0.5 rounded bg-gray-50 text-gray-700">82</span>
                </button>
              </div>

              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#8C95A8' }} />
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full h-8 pl-9 pr-3 border rounded-lg text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{ borderColor: '#8C95A8' }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="flex items-center justify-center h-8 px-3 border rounded-lg transition-colors hover:bg-gray-50" style={{ borderColor: '#8C95A8' }}>
                  <Filter className="w-4 h-4" style={{ color: '#8C95A8' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Work Items */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-3">
              {workItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-gray-300 transition-all cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 mb-3">{item.title}</p>

                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                      {item.notes}
                    </p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <User className="w-3.5 h-3.5" />
                        {item.assignee}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Briefcase className="w-3.5 h-3.5" />
                        {item.role}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Clock className="w-3.5 h-3.5" />
                        Day {item.daysOpen}
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center h-8 px-3 py-2 rounded-md text-xs font-medium" style={{ backgroundColor: '#EAE8FB', color: '#4D3EE0' }}>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" style={{ color: '#4338CA' }} />
                        {item.actions} Agent Actions
                      </span>
                      <span className="inline-flex items-center h-8 px-3 py-2 rounded-md text-xs font-medium bg-white border border-gray-300 text-gray-900">
                        <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                        Open
                      </span>
                    </div>
                  </div>

                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel - AI Assistant */}
        <div className="w-[420px] flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto shadow-sm p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-semibold text-gray-900">AI Assistant</h2>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <Maximize2 className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 text-sm mb-1">Hello Alex</p>
                <p className="text-xl font-semibold text-gray-900">How can I help?</p>
              </div>
            </div>

           <div className="space-y-3" style={{ marginBottom: '12px' }}>
  <div className="inline-block rounded-full p-[1px] bg-gradient-to-r from-teal-400 to-indigo-500">
    <button className="px-3 py-2 rounded-full bg-white text-gray-900 text-xs hover:bg-indigo-50 transition-colors text-left">
      What are the main blockers in my hiring flow?
    </button>
  </div>

  <div className="inline-block rounded-full p-[1px] bg-gradient-to-r from-teal-400 to-indigo-500">
    <button className="px-3 py-2 rounded-full bg-white text-gray-900 text-xs hover:bg-indigo-50 transition-colors text-left">
      What are the most critical open cases?
    </button>
  </div>
</div>

            <div className="relative flex items-center">
              <button className="absolute left-3 p-1 hover:bg-gray-100 rounded transition-colors">
                <Plus className="w-4 h-4 text-gray-400" />
              </button>
              <input
                type="text"
                placeholder="Ask anything"
                className="w-full pl-10 pr-20 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute right-2 flex items-center gap-1">
                <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                  <Mic className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1.5 bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                  <ArrowUp className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workroom;
