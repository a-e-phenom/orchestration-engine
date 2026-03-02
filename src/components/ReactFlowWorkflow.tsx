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
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Zap, FileText, BarChart3, Check, Bot, Radio } from 'lucide-react';

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
          animated: true,
          style: { stroke: '#6366f1', strokeWidth: 2 },
        });
      } else {
        newEdges.push({
          id: `activity-${activities[index - 1].id}-to-${nodeId}`,
          source: `activity-${activities[index - 1].id}`,
          target: nodeId,
          animated: true,
          style: { stroke: '#6366f1', strokeWidth: 2 },
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
      animated: true,
      style: { stroke: '#16a34a', strokeWidth: 2 },
    });

    setNodes(newNodes);
    setEdges(newEdges);
  }, [activities, setNodes, setEdges]);

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          { ...connection, animated: true, style: { stroke: '#6366f1', strokeWidth: 2 } },
          eds
        )
      ),
    [setEdges]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ReactFlowWorkflow;
