import { ArrowLeft, Zap, FileText, BarChart3, Check, Bot, Cog, Users, Radio, MessageSquare } from 'lucide-react';
import ReactFlowWorkflow from './ReactFlowWorkflow';

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
      { id: 1, label: 'Screening Questions', type: 'activity', icon: FileText, description: 'Evaluate candidate responses' },
      { id: 2, label: 'Screening Agent', type: 'agent', icon: Bot, description: 'AI-powered evaluation' },
      { id: 3, label: 'Rejection Message', type: 'activity', icon: MessageSquare, description: 'Send rejection notification' },
      { id: 4, label: 'Next Stage', type: 'activity', icon: MessageSquare, description: 'Advance to interview stage' }
    ],
    agentic: 65,
    automatic: 20,
    human: 15
  },
  '3': {
    activities: [
      { id: 1, label: 'Interview Scheduling', type: 'automation', icon: Zap, description: 'Auto-schedule with candidates' },
      { id: 2, label: 'Interview Prep', type: 'activity', icon: FileText, description: 'Brief interviewers and send materials' },
      { id: 3, label: 'Interview Agent', type: 'agent', icon: Radio, description: 'Technical Assessment' },
      { id: 4, label: 'Interview Feedback', type: 'automation', icon: BarChart3, description: 'Collect and summarize feedback' },
      { id: 5, label: 'Decision Assessment', type: 'activity', icon: FileText, description: 'Final hiring team discussion' }
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

  const branchConfigs: { [key: string]: { [nodeId: string]: string[] } } = {
    '2': {
      'activity-1': ['activity-2', 'activity-3'],
      'activity-2': ['activity-4', 'end']
    }
  };

  const branchConfig = branchConfigs[stageId];

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


      <div className="flex-1 overflow-hidden relative">
        <ReactFlowWorkflow
          activities={activities}
          stageId={stageId}
          branchConfig={branchConfig}
        />
      </div>
    </div>
  );
};

export default StageDetailMap;
