import { ChevronLeft, GitCompareArrows, CheckCircle2 } from 'lucide-react';

interface StageMapProps {
  stageName: string;
  onBack: () => void;
}

const StageMap = ({ stageName, onBack }: StageMapProps) => {
  const activities = {
    'Application': ['Form Submission', 'Resume Parse', 'Email Confirmation', 'Application Review'],
    'Screening': ['Resume Screening', 'Skills Assessment', 'Phone Screen', 'Qualification Check'],
    'Interview': ['Initial Interview', 'Technical Interview', 'Manager Interview', 'Team Interview', 'References Check'],
    'Offer': ['Offer Generation', 'Offer Review', 'Candidate Acceptance', 'Onboarding Start']
  };

  const stageActivities = activities[stageName as keyof typeof activities] || [];

  return (
    <div className="flex-1 overflow-auto relative flex flex-col" style={{
      backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)',
      backgroundSize: '24px 24px',
      backgroundColor: '#f9fafb'
    }}>
      <div className="border-b border-[#E8EAEE]"></div>

      <div className="p-8 flex flex-col items-center min-h-full">
        <div className="w-full max-w-2xl mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Hiring Motion
          </button>
        </div>

        <div className="max-w-2xl mx-auto w-full">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">{stageName} Stage</h2>

          <div className="flex flex-col items-center">
            <div className="flex flex-col gap-0 w-full max-w-sm">
              <div className="mb-0">
                <div className="bg-white rounded-xl px-3 pb-2 pt-2.5 shadow-sm w-full text-left border border-[#E8EAEE]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <GitCompareArrows className="w-5 h-5" style={{ color: '#BA4800' }} />
                      <span className="text-sm font-medium text-gray-700">Rule Evaluation</span>
                      <span className="text-sm text-gray-500">(3)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8 mt-0" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px)' }}></div>

              <div className="space-y-6 mt-8 relative">
                {stageActivities.map((activity, idx) => (
                  <div key={idx} className="relative flex flex-col items-center">
                    <div className="bg-white border border-[#E8EAEE] rounded-lg px-4 py-3 w-full shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-sm font-medium text-gray-800">{activity}</span>
                    </div>
                    {idx < stageActivities.length - 1 && (
                      <div className="w-0.5 h-8 mt-6" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px)' }}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-8" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, #d1d5db 0px, #d1d5db 4px, transparent 4px, transparent 8px)', marginTop: '24px' }}></div>

              <div className="mt-8">
                <div className="bg-white rounded-xl px-3 pb-2 pt-2.5 shadow-sm w-full text-left border border-[#E8EAEE]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-gray-700">End</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageMap;
