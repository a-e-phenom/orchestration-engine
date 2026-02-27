import { AlertCircle, Clock, MapPin, ChevronRight } from 'lucide-react';
import MapWidget from './MapWidget';

const Operations = () => {
  return (
    <div className="flex-1 flex overflow-hidden bg-white">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Map Widget */}
          <MapWidget />

          {/* Pipeline and Bottlenecks */}
          <div className="space-y-6">
            {/* Pipeline Stages */}


            {/* Bottlenecks */}
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <h3 className="font-medium text-gray-900">Bottlenecks (1 stage)</h3>
              </div>
              <p className="text-sm text-gray-600 mb-2">Interview - breakdown by region</p>

              <div className="bg-gray-50 rounded-xl p-3 space-y-3">
                {[
                  { city: 'Chicago', cases: 67, avg: '4.8 days' },
                  { city: 'Houston', cases: 52, avg: '3.9 days' },
                  { city: 'New York', cases: 71, avg: '4.2 days' },
                  { city: 'Dallas', cases: 49, avg: '3.6 days' }
                ].map((region, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-white">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-50 p-2 rounded-lg">
                        <MapPin className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{region.city}</p>
                        <p className="text-xs text-gray-600">{region.cases} cases</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mr-1">avg. {region.avg}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Panel - Status and Actions */}
      <div className="w-[420px] flex-shrink-0 bg-white border-l border-gray-200 overflow-y-auto shadow-sm p-6 flex flex-col">
        <div className="space-y-6">
            {/* Operation Status */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Operation Status</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Active Cases', value: '409' },
                  { label: 'Completed', value: '203' },
                  { label: 'Active Escalations', value: '14/127' },
                  { label: 'Active SLA Breaches', value: '6/8' }
                ].map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-gray-200 p-4">
                    <p className="text-xs text-gray-600 mb-2">{stat.label}</p>
                    <p className="text-lg font-medium text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Stage Progression */}
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Stage progression</h3>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-full h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">Application: 100%</span>
                  </div>
                  <div className="w-5/6 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">Screening: 89%</span>
                  </div>
                  <div className="w-2/3 h-8 bg-indigo-400 rounded-md flex items-center justify-center">
                    <span className="text-white font-semibold text-xs">Interview: 24%</span>
                  </div>
                  <div className="w-1/4 h-6 bg-indigo-200 rounded-md flex items-center justify-center">
                    <span className="text-gray-700 font-semibold text-xs">Offer: 1%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Orchestration Agent Actions */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Orchestration Agent Actions (65)</h3>
              <div className="space-y-2">
                {[
                  { title: 'Escalated Interview waiting time to HM', person: 'Alex Smith' },
                  { title: 'Escalated Interview waiting time to HM', person: 'Alex Smith' },
                  { title: 'Screening Decision', subtitle: 'Moved candidate', person: 'Jonas Park' }
                ].map((action, idx) => (
                  <div key={idx} className="bg-white rounded-lg border border-gray-200 p-3 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{action.title}</p>
                        {action.subtitle && (
                          <p className="text-xs text-gray-600">{action.subtitle} {action.person}</p>
                        )}
                        {!action.subtitle && (
                          <p className="text-xs text-gray-600">Sent escalation to {action.person}</p>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                  </div>
                ))}
                <button className="w-full bg-gray-50 py-2 text-sm text-gray-600 hover:text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition-colors">
                  See all
                </button>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Operations;
