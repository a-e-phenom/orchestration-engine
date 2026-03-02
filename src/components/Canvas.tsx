import { useState } from 'react';
import WorkflowNode from './WorkflowNode';
import ConnectionLine from './ConnectionLine';
import SidePanelSection from './SidePanelSection';
import StageDetailMap from './StageDetailMap';
import Workroom from './Workroom';
import Operations from './Operations';
import DataPage from './DataPage';
import { Plus, Layers, Zap, AlertCircle, FileText, Bot, GitBranch, GitCompareArrows, X, HelpCircle, MoreVertical, Shield, File, Calendar, MessageSquare, Zap as ZapIcon, ArrowRight } from 'lucide-react';

interface Node {
  id: string;
  label: string;
  step: number;
  hasEye?: boolean;
}

interface CanvasProps {
  activeTab: string;
}

const STAGE_DATA: { [key: string]: { activities: any[], agentic: number, automatic: number, human: number } } = {
  '1': {
    activities: [
      { id: 1, label: 'Application Intake', type: 'automation', icon: Zap, description: 'Auto-parse and validate submissions' },
      { id: 2, label: 'Initial Screening', type: 'activity', icon: FileText, description: 'Check basic qualifications' },
      { id: 3, label: 'Data Enrichment', type: 'automation', icon: Zap, description: 'Add candidate background info' },
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
      { id: 3, label: 'Screening Agent', type: 'agent', icon: Bot, description: 'Healthcare Questionnaire' },
      { id: 4, label: 'Candidate Ranking', type: 'automation', icon: Zap, description: 'Generate ranking report' },
      { id: 5, label: 'Feedback Review', type: 'activity', icon: FileText, description: 'Recruiter assessment' }
    ],
    agentic: 65,
    automatic: 20,
    human: 15
  },
  '3': {
    activities: [
      { id: 1, label: 'Interview Scheduling', type: 'automation', icon: Zap, description: 'Auto-schedule with candidates' },
      { id: 2, label: 'Interview Prep', type: 'activity', icon: FileText, description: 'Brief interviewers and send materials' },
      { id: 3, label: 'Interview Agent', type: 'agent', icon: Bot, description: 'Technical Assessment' },
      { id: 4, label: 'Interview Feedback', type: 'automation', icon: Zap, description: 'Collect and summarize feedback' },
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
      { id: 3, label: 'Offer Delivery', type: 'automation', icon: Zap, description: 'Send offer to candidate' },
      { id: 4, label: 'Negotiations', type: 'activity', icon: FileText, description: 'Handle counter-offers' }
    ],
    agentic: 50,
    automatic: 35,
    human: 15
  }
};

const Canvas = ({ activeTab }: CanvasProps) => {
  const [nodes] = useState<Node[]>([
    { id: '1', label: 'Apply', step: 1 },
    { id: '2', label: 'Screening', step: 2, hasEye: true },
    { id: '3', label: 'Interview', step: 2, hasEye: true },
    { id: '4', label: 'Offer', step: 1 },
  ]);

  const [showPanel, setShowPanel] = useState(false);
  const [showRulePanel, setShowRulePanel] = useState(false);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [stageDetailView, setStageDetailView] = useState<string | null>(null);

  if (activeTab === 'workroom') {
    return <Workroom />;
  }

  if (activeTab === 'operation') {
    return <Operations />;
  }

  if (activeTab === 'data') {
    return <DataPage />;
  }

  if (stageDetailView) {
    return <StageDetailMap stageId={stageDetailView} stageName={nodes.find(n => n.id === stageDetailView)?.label || ''} onBack={() => setStageDetailView(null)} />;
  }

  return (
    <div className="flex-1 overflow-auto relative flex flex-col" style={{
      backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      backgroundColor: '#f9fafb'
    }}>
      <div className="border-b border-[#E8EAEE]"></div>
      {/* Orchestration Agent Card - Absolute Position */}
      <div className="absolute top-6 left-6 z-10">
        <button
          onClick={() => {
            setShowPanel(true);
            setShowRulePanel(false);
            setSelectedNodeId(null);
          }}
          className="bg-white rounded-2xl p-0 w-72 text-left hover:bg-gray-50 transition-all" style={{
            border: showPanel ? '2px solid #4D3EE0' : '1px solid #E8EAEE',
            boxShadow: 'inset 0 3px 0 0 #D2CEF7'
          }}
          onMouseEnter={(e) => {
            if (!showPanel) {
              e.currentTarget.style.borderColor = '#4338ca';
            }
          }}
          onMouseLeave={(e) => {
            if (!showPanel) {
              e.currentTarget.style.borderColor = '#E8EAEE';
            }
          }}>
          <div className="flex items-center gap-2 mb-4 p-3 w-full border-b border-[#E8EAEE]">
            <Bot className="w-5 h-5 flex-shrink-0" style={{ color: '#4D3EE0' }} />
            <h3 className="text-sm font-medium text-gray-900">Orchestration Agent</h3>
          </div>

          <div className="flex flex-wrap px-3 pb-3 gap-2">
            <div className="px-2 py-1 bg-gray-50 text-xs text-gray-700" style={{ borderRadius: '6px' }}>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                1 Agent Evaluation
              </div>
            </div>
            <div className="px-2 py-1 bg-gray-50 text-xs text-gray-700" style={{ borderRadius: '6px' }}>
              <div className="flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                2 Escalations
              </div>
            </div>
            <div className="px-2 py-1 bg-gray-50 text-xs text-gray-700" style={{  borderRadius: '6px' }}>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                3 context files
              </div>
            </div>
          </div>
        </button>
      </div>

      <div className="p-8 flex flex-col items-center min-h-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center">
            {/* Rule Evaluation Header */}
            <div className="mb-0">
              <button
                onClick={() => {
                  setShowRulePanel(true);
                  setShowPanel(false);
                  setSelectedNodeId(null);
                }}
                className="bg-white rounded-xl px-3 pb-2 pt-2.5 shadow-sm hover:bg-gray-50 transition-all w-full text-left" style={{
                  border: showRulePanel ? '2px solid #4D3EE0' : '1px solid #E8EAEE',
                  boxShadow: 'inset 0 3px 0 0 #BA4800'
                }}
                onMouseEnter={(e) => {
                  if (!showRulePanel) {
                    e.currentTarget.style.borderColor = '#4338ca';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!showRulePanel) {
                    e.currentTarget.style.borderColor = '#E8EAEE';
                  }
                }}>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5">
                    <GitCompareArrows className="w-5 h-5" style={{ color: '#BA4800' }} />
                    <span className="text-sm font-medium text-gray-700">Rule Evaluation</span>
                    <span className="text-sm text-gray-500">(3)</span>
                  </div>
                </div>
              </button>
            </div>

            {/* Connection line from header */}
            <ConnectionLine />

            {/* Workflow Nodes */}
            <div className="flex flex-col gap-0" style={{ width: '264px' }}>
              {nodes.map((node, index) => (
                <div key={node.id} className="flex flex-col gap-0">
                  <WorkflowNode
                    label={node.label}
                    step={node.step}
                    hasEye={node.hasEye}
                    onClick={() => {
                      setSelectedNodeId(node.id);
                      setShowPanel(false);
                      setShowRulePanel(false);
                    }}
                    onChevronClick={() => {
                      setStageDetailView(node.id);
                    }}
                    isSelected={selectedNodeId === node.id}
                  />
                  {index < nodes.length - 1 && <ConnectionLine />}
                </div>
              ))}
            </div>

            {/* Add Button */}
            <div className="flex flex-col items-center gap-0">
              <ConnectionLine isShort />
              <button className="w-6 h-6 text-white rounded flex items-center justify-center transition-colors shadow-sm" style={{ backgroundColor: '#8C95A8' }}>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {showPanel && (
        <div className="fixed right-0 top-[65px] h-[calc(100%-64px)] w-[502px] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 py-4 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 mt-4">Orchestration Agent</h3>
                <p className="text-xs text-gray-500">Configure the orchestration agent that controls the flow</p>
              </div>
            </div>
            <button
              onClick={() => setShowPanel(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-6">
              <div>
                <SidePanelSection title="General" />
                <div className="mt-2">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Goal</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows={4}
                    defaultValue="Ensure every ICU nurse candidate reaches a hiring decision within 14 days. Un-block the workflow if it gets stuck."
                  />
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <SidePanelSection title="Policies" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-900">3 Policies</p>
                  <button className="text-[#2927B2] hover:text-indigo-900 text-sm font-medium">+ Add</button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Interview Blockage', tag: 'Escalation', description: 'If interview slots are not available for 2 days, escalate to HM' },
                    { title: 'Recruiter feedback', tag: 'Escalation', description: 'If recruiter feedback is not submitted within 24h after the interview, escalate to HM' },
                    { title: 'AI Screening', tag: 'AI Evaluation', description: 'If screening score is high, but there are fraud suspicions, move candidate to waitlist' }
                  ].map((policy, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4" style={{ color: '#4D3EE0' }} />
                            <span className="text-sm font-medium text-gray-900">{policy.title}</span>
                            <span className="text-xs px-1 py-0 rounded" style={{ backgroundColor: policy.tag === 'Escalation' ? '#FEE4D6' : '#EDE9FE', color: policy.tag === 'Escalation' ? '#BA4800' : '#5E3FBE' }}>
                              {policy.tag}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 bg-gray-50 rounded-md px-2 py-1.5">{policy.description}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-4">
                  <SidePanelSection title="Context Data" />
                </div>
                <p className="text-sm text-gray-600 mb-4">Give the orchestration agent more data to make decisions.</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">2 Files</p>
                    <button className="text-[#2927B2] hover:text-indigo-900 text-sm font-medium">+ Add</button>
                  </div>
                  {[
                    { name: 'Recruiting_company_practices.pdf' },
                    { name: 'Ideal_candidate_profile_soft_skills.pdf' }
                  ].map((file, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <File className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{file.name}</span>
                      </div>
                      <button className="p-1 hover:bg-gray-200 rounded">
                        <MoreVertical className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rule Evaluation Side Panel */}
      {showRulePanel && (
        <div className="fixed right-0 top-[65px] h-[calc(100%-64px)] w-[502px] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 py-4 flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 mt-4">Rule Evaluation</h3>
                <p className="text-xs text-gray-500">Evaluates incoming cases and sets all needed variables at the start so each case follows the correct path later.</p>
              </div>
            </div>
            <button
              onClick={() => setShowRulePanel(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="px-6 py-6">
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <SidePanelSection title="Policy Rules" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-900">3 Policies</p>
                  <button className="text-[#2927B2] hover:text-indigo-900 text-sm font-medium">+ Add</button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'German applicants', description: 'If candidate location is Germany, set  Variable   to   Value' },
                    { title: 'Design Jobs', description: 'If candidate role is Designer, set  Variable   to   Value' },
                    { title: 'VP Roles', description: 'If job role is VP, set  Variable   to   Value' }
                  ].map((policy, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4" style={{ color: '#5E48B8' }} />
                            <span className="text-sm font-medium text-gray-900">{policy.title}</span>
                          </div>
                          <p className="text-xs text-gray-600 bg-gray-50 rounded-md px-2 py-1.5">{policy.description}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Workflow Node Side Panel */}
      {selectedNodeId && (
        <div className="fixed right-0 top-[65px] h-[calc(100%-64px)] w-[502px] bg-white border-l border-gray-200 shadow-lg z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white px-6 py-4 flex items-start justify-between border-b border-gray-200">
            <div className="flex items-start gap-3 flex-1">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1 mt-4">{nodes.find(n => n.id === selectedNodeId)?.label} Subflow</h3>
                <p className="text-xs text-gray-500">
                  {selectedNodeId === '1' && 'Initial stage where candidates submit their applications'}
                  {selectedNodeId === '2' && 'Standard screening stage with automated evaluation'}
                  {selectedNodeId === '3' && 'Standard interview stage with 2 interviews'}
                  {selectedNodeId === '4' && 'Final stage for offer preparation and approval'}
                </p>
                          <div className="px-6 py-4">
            <button
              onClick={() => {
                setStageDetailView(selectedNodeId);
                setSelectedNodeId(null);
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
              <ArrowRight className="w-4 h-4" />
              Open Subflow
            </button>
          </div>
              </div>
              
            </div>
            <button
              onClick={() => setSelectedNodeId(null)}
              className="p-1 hover:bg-gray-100 rounded transition-colors flex-shrink-0">
              <X className="w-5 h-5 text-gray-400" />
            </button>
            
          </div>



          <div className="px-6 py-6">
            <div className="space-y-6">
              {/* Automation Rate */}
              <div>
                <div className="mb-4">
                  <SidePanelSection title="Automation Rate" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Agentic', value: '30%' },
                    { label: 'HITL', value: '10%' },
                    { label: 'Human', value: '60%' }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 text-center hover:bg-gray-50">
                      <p className="text-xs text-gray-600 mb-2">{item.label}</p>
                      <p className="text-lg font-semibold text-gray-900">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Policies */}
              <div>
                <div className="mb-4">
                  <SidePanelSection title="Policies" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-900">3 Policies</p>
                  <button className="text-[#2927B2] hover:text-indigo-900 text-sm font-medium">+ Add</button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: 'Interview Blockage', tag: 'Escalation', description: 'If interview slots are not available for 2 days, escalate to HM' },
                    { title: 'Recruiter feedback', tag: 'Escalation', description: 'If recruiter feedback is not submitted within 24h after the interview, escalate to HM' },
                    { title: 'AI Screening', tag: 'AI Evaluation', description: 'If screening score is high, but there are fraud suspicions, move candidate to waitlist' }
                  ].map((policy, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className="w-4 h-4" style={{ color: '#4D3EE0' }} />
                            <span className="text-sm font-medium text-gray-900">{policy.title}</span>
                            <span className="text-xs px-1 py-0 rounded" style={{ backgroundColor: policy.tag === 'Escalation' ? '#FEE4D6' : '#EDE9FE', color: policy.tag === 'Escalation' ? '#BA4800' : '#5E3FBE' }}>
                              {policy.tag}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 bg-gray-50 rounded-md px-2 py-1.5">{policy.description}</p>
                        </div>
                        <button className="p-1 hover:bg-gray-200 rounded">
                          <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div>
                <div className="mb-4">
                  <SidePanelSection title="Activities" />
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-medium text-gray-900">{STAGE_DATA[selectedNodeId || '1'].activities.length} Activities</p>
                </div>
                <div className="space-y-3">
                  {STAGE_DATA[selectedNodeId || '1'].activities.map((activity) => {
                    const ActivityIcon = activity.icon;
                    return (
                      <button
                        key={activity.id}
                        className="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
                        <div className="bg-indigo-50 rounded p-2 flex-shrink-0">
                          <ActivityIcon className="w-3.5 h-3.5" style={{ color: '#4D3EE0' }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">{activity.label}</p>
                          <p className="text-xs text-gray-500 truncate">{activity.description}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;
