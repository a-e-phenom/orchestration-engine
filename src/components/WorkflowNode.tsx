import { Layers, Eye, ChevronRight, Bot } from 'lucide-react';

interface WorkflowNodeProps {
  label: string;
  step: number;
  hasEye?: boolean;
  onClick?: () => void;
  onChevronClick?: () => void;
  isSelected?: boolean;
}

const WorkflowNode = ({ label, step, hasEye, onClick, onChevronClick, isSelected }: WorkflowNodeProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl shadow-xs hover:border-indigo-700 transition-colors" style={{
        borderColor: isSelected ? '#4D3EE0' : ''
      }}>
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-2 py-1 rounded-lg" style={{ backgroundColor: '#F4F6FA' }}>
            <Layers className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-600">{step}</span>
          </div>
          <span className="text-sm font-medium text-gray-900">{label}</span>
        </div>

        <div className="flex items-center gap-1">
          {hasEye && (
            <button className="p-1 bg-indigo-50 rounded-lg">
              <Bot className="w-4 h-4 text-indigo-600" />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onChevronClick?.();
            }}
            className="p-1 hover:bg-gray-100 rounded transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>
    </button>
  );
};

export default WorkflowNode;
