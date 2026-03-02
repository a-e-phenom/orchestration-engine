import { useCallback, useState, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Background,
  Controls,
  getSmoothStepPath,
  EdgeProps,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Zap, FileText, BarChart3, Check, Bot, Radio, Plus } from 'lucide-react';

interface ActivityNode {
  id: string;
  label: string;
  type: 'automation' | 'activity' | 'agent' | 'start' | 'end';
  icon: any;
  description: string;
}

interface ReactFlowWorkflowProps {
  activities: ActivityNode[];
  stageId: string;
}

const CustomEdge = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY } = props;
  const [isHovering, setIsHovering] = useState(false);

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;

  return (
    <g>
      <defs>
        <marker
          id="custom-arrow"
          markerWidth="10"
          markerHeight="10"
          refX="9"
          refY="3"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,6 L9,3 z" fill="#AEB5C2" />
        </marker>
      </defs>
      <path
        d={`M ${sourceX} ${sourceY} L ${sourceX} ${midY} L ${targetX} ${midY} L ${targetX} ${targetY}`}
        fill="none"
        stroke="#AEB5C2"
        strokeWidth={2}
        markerEnd="url(#custom-arrow)"
      />
      <circle
        cx={midX}
        cy={midY}
        r={isHovering ? 12 : 6}
        fill={isHovering ? '#8C95A8' : '#d1d5db'}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ cursor: 'pointer', transition: 'all 0.2s' }}
      />
      {isHovering && (
        <foreignObject x={midX - 8} y={midY - 8} width={16} height={16}>
          <div className="flex items-center justify-center w-full h-full">
            <Plus className="w-4 h-4 text-white" strokeWidth={3} />
          </div>
        </foreignObject>
      )}
    </g>
  );
};

const ActivityNodeComponent = ({ data }: { data: any }) => {
  const isAgent = data.type === 'agent';
  const isStart = data.type === 'start';
  const isEnd = data.type === 'end';

  let bgColor = 'bg-white';
  let borderColor = 'border-gray-200';
  let accentColor = '#5E48B8';
  let bgAccent = '#EAE8FB';

  if (isStart) {
    bgColor = 'bg-white';
    borderColor = 'border-orange-300';
    accentColor = '#BA4800';
    bgAccent = '#FED7AA';
  } else if (isEnd) {
    bgColor = 'bg-white';
    borderColor = 'border-green-300';
    accentColor = '#16a34a';
    bgAccent = '#DCFCE7';
  } else if (isAgent) {
    bgColor = 'bg-white';
    borderColor = 'border-indigo-400';
  }

  const Icon = data.icon;

  return (
    <div
      className={`${bgColor} ${borderColor} border-2 rounded-xl p-3 shadow-md min-w-[240px] ${isAgent ? 'bg-indigo-50' : ''}`}
      style={{ borderColor: isAgent ? '#818CF8' : 'inherit' }}
    >
      <Handle type="target" position={Position.Top} />
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center p-2 rounded-lg flex-shrink-0"
          style={{ backgroundColor: bgAccent }}
        >
          <Icon className="w-4 h-4" style={{ color: accentColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{data.label}</p>
          <p className="text-xs text-gray-600 mt-1">{data.description}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

const nodeTypes = {
  activity: ActivityNodeComponent,
};

const ReactFlowWorkflow = ({ activities, stageId }: ReactFlowWorkflowProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const newNodes: Node[] = [];
    const newEdges: Edge[] = [];

    newNodes.push({
      id: 'start',
      data: {
        label: 'Rule Evaluation',
        type: 'start',
        icon: Radio,
        description: 'Evaluates incoming cases',
      },
      position: { x: 0, y: 0 },
      type: 'activity',
    });

    let yPosition = 120;
    activities.forEach((activity, index) => {
      const nodeId = `activity-${activity.id}`;
      newNodes.push({
        id: nodeId,
        data: {
          label: activity.label,
          type: activity.type,
          icon: activity.icon,
          description: activity.description,
        },
        position: { x: 0, y: yPosition },
        type: 'activity',
      });

      if (index === 0) {
        newEdges.push({
          id: `start-to-${nodeId}`,
          source: 'start',
          target: nodeId,
          type: 'custom',
        });
      } else {
        newEdges.push({
          id: `activity-${activities[index - 1].id}-to-${nodeId}`,
          source: `activity-${activities[index - 1].id}`,
          target: nodeId,
          type: 'custom',
        });
      }

      yPosition += 140;
    });

    newNodes.push({
      id: 'end',
      data: {
        label: 'End',
        type: 'end',
        icon: Check,
        description: 'Workflow complete',
      },
      position: { x: 0, y: yPosition },
      type: 'activity',
    });

    newEdges.push({
      id: `activity-${activities[activities.length - 1].id}-to-end`,
      source: `activity-${activities[activities.length - 1].id}`,
      target: 'end',
      type: 'custom',
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [activities, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...connection, type: 'custom' },
          eds
        )
      ),
    [setEdges]
  );

  const edgeTypes = {
    custom: CustomEdge,
  };

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowWorkflow;
