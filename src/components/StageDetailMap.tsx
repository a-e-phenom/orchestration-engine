import { ArrowLeft, GitCompareArrows, Zap, FileText, BarChart3, Check, Bot, Cog, Users } from 'lucide-react';
import ConnectionLine from './ConnectionLine';

interface StageDetailMapProps {
  stageId: string;
  stageName: string;
  onBack: () => void;
}

const STAGE_DATA: { [key: string]: { activities: any[], agentic: number, automatic: number, human: number } } = {
  '1': {
    activities: [
      { id: 1, label: 'Application Intake', type: 'automation', icon: Zap, description: 'Auto-parse and validate submissions' },
      { id: 2, label: 'Initial Screening', type: 'activity', icon: FileText, description: 'Check basic qualifications' },
      { id: 3, label: 'Data Enrichment', type: 'automation', icon: BarChart3, description: 'Add candidate background info' },
      { id: 4, label: 'Verification', type: 'activity', icon: FileText, description: 'Manual credential check' }
    ],
    agentic: 45,
    automatic: 25,
    human: 30
  },
  '2': {
    activities: [
      { id: 1, label: 'Resume Analysis', type: 'automation', icon: Zap, description: 'AI-powered resume scoring' },
      { id: 2, label: 'Skills Assessment', type: 'activity', icon: FileText, description: 'Technical evaluation tests' },
      { id: 3, label: 'Candidate Ranking', type: 'automation', icon: BarChart3, description: 'Generate ranking report' },
      { id: 4, label: 'Feedback Review', type: 'activity', icon: FileText, description: 'Recruiter assessment' }
    ],
    agentic: 65,
    automatic: 20,
    human: 15
  },
  '3': {
    activities: [
      { id: 1, label: 'Interview Scheduling', type: 'automation', icon: Zap, description: 'Auto-schedule with candidates' },
      { id: 2, label: 'Interview Prep', type: 'activity', icon: FileText, description: 'Brief interviewers and send materials' },
      { id: 3, label: 'Interview Feedback', type: 'automation', icon: BarChart3, description: 'Collect and summarize feedback' },
      { id: 4, label: 'Decision Assessment', type: 'activity', icon: FileText, description: 'Final hiring team discussion' }
    ],
    agentic: 35,
    automatic: 30,
    human: 35
  },
  '4': {
    activities: [
      { id: 1, label: 'Offer Generation', type: 'automation', icon: Zap, description: 'Auto-create offer terms' },
      { id: 2, label: 'Approval Flow', type: 'activity', icon: FileText, description: 'Executive sign-off' },
      { id: 3, label: 'Offer Delivery', type: 'automation', icon: BarChart3, description: 'Send offer to candidate' },
      { id: 4, label: 'Negotiations', type: 'activity', icon: FileText, description: 'Handle counter-offers' }
    ],
    agentic: 50,
    automatic: 35,
    human: 15
  }
};

const StageDetailMap = ({ stageId, stageName, onBack }: StageDetailMapProps) => {
  const stageConfig = STAGE_DATA[stageId] || STAGE_DATA['2'];
  const activities = stageConfig.activities;

  return (
    <div className="flex-1 overflow-auto relative flex flex-col">
      <header className="bg-white border-b border-gray-200 px-6 flex items-center h-16 flex-shrink-0 justify-between">
  {/* Left side */}
  <div className="flex items-center">
    <button
      onClick={onBack}
      className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 -ml-2"
      aria-label="Go back"
    >
      <ArrowLeft className="w-5 h-5 text-gray-600" />
    </button>
    <h1 className="text-lg font-medium text-gray-900 ml-4">
      {stageName} Subflow
    </h1>
  </div>

 {/* Right side tags */}
<div className="flex items-center gap-2">
  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-gray-200 bg-white">
    <Bot className="w-3.5 h-3.5 text-indigo-500" />
    <span className="text-xs text-gray-700">{stageConfig.agentic}% Agentic</span>
  </div>

  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-gray-200 bg-white">
    <Cog className="w-3.5 h-3.5 text-orange-500" />
    <span className="text-xs text-gray-700">{stageConfig.automatic}% Automatic</span>
  </div>

  <div className="flex items-center gap-1.5 px-2 py-1 rounded-md border border-gray-200 bg-white">
    <Users className="w-3.5 h-3.5 text-green-500" />
    <span className="text-xs text-gray-700">{stageConfig.human}% Human</span>
  </div>
</div>

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
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center p-2 rounded-lg" style={{ backgroundColor: '#EAE8FB' }}>
                              <ActivityIcon className="w-4 h-4" style={{ color: '#5E48B8' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-900">{activity.label}</span>
                          </div>
                          <span className="text-xs pb-1 pt-1.5" style={{ color: '#637085' }}>{activity.description}</span>
                        </div>

                      </div>
                    </button>
                    {index < activities.length - 1 && <ConnectionLine />}
                  </div>
                );
              })}
            </div>

            {/* End Card */}
            <div className="flex flex-col items-center gap-0">
              <ConnectionLine />
              <div className="bg-white rounded-xl px-3 pb-2 pt-2.5 shadow-sm w-full text-left border border-[#E8EAEE]" style={{
                boxShadow: 'inset 0 3px 0 0 #16a34a'
              }}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center p-0 rounded-lg">
                    <Check className="w-4 h-4" style={{ color: '#16a34a' }} />
                  </div>
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
