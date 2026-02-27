import { Layers, Zap, AlertCircle, File } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-white rounded">
            <Layers className="w-4 h-4 text-blue-600" />
          </div>
          <h2 className="font-medium text-gray-900">Orchestration Agent</h2>
        </div>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-gray-600">
            <Zap className="w-3.5 h-3.5" />
            <span>1 Agent Evaluation</span>
          </div>
          <div className="flex items-center gap-2 text-rose-600">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>2 Escalations</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <File className="w-3.5 h-3.5" />
            <span>3 context files</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
