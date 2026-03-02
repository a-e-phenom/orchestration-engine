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
  branchConfig?: { [nodeId: string]: string[] };
}

const CustomEdge = (props: EdgeProps) => {
  const { sourceX, sourceY, targetX, targetY } = props;
  const [isHovering, setIsHovering] = useState(false);

  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  const dx = targetX - sourceX;
  const dy = targetY - sourceY;

  return (
    <g>
      <path
        d={`M ${sourceX} ${sourceY} L ${sourceX} ${midY} L ${targetX} ${midY} L ${targetX} ${targetY}`}
        fill="none"
        stroke="#D1D5DB"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        rx="8"
        ry="8"
      />
      <circle
        cx={midX}
        cy={midY}
        r={isHovering ? 14 : 8}
        fill={isHovering ? '#6B7280' : '#E5E7EB'}
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
  let borderColor = '#E8EAEE';
  let accentColor = '#5E48B8';
  let bgAccent = '#EAE8FB';
  let boxShadowStyle = 'inset 0 3px 0 0 #D2CEF7';

  if (isStart) {
    bgColor = 'bg-white';
    borderColor = '#E8EAEE';
    accentColor = '#BA4800';
    bgAccent = '#FED7AA';
    boxShadowStyle = 'inset 0 3px 0 0 #FDBA74';
  } else if (isEnd) {
    bgColor = 'bg-white';
    borderColor = '#E8EAEE';
    accentColor = '#16a34a';
    bgAccent = '#DCFCE7';
    boxShadowStyle = 'inset 0 3px 0 0 #BBF7D0';
  } else if (isAgent) {
    bgColor = 'bg-white';
    borderColor = '#818CF8';
  }

  const Icon = data.icon;

  if (isStart || isEnd) {
    return (
      <div
        className="bg-white rounded-xl px-4 py-3 w-full flex items-center justify-center shadow-sm hover:shadow-md transition-shadow"
        style={{
          border: '1.5px solid ' + borderColor,
          boxShadow: boxShadowStyle
        }}
      >
        <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
        <div className="flex items-center gap-2.5">
          <Icon className="w-5 h-5 flex-shrink-0" style={{ color: accentColor }} />
          <span className="text-sm font-semibold text-gray-900">{data.label}</span>
        </div>
        <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
      </div>
    );
  }

  return (
    <div
      className={`${bgColor} rounded-xl p-4 min-w-[280px] ${isAgent ? 'border-2 border-indigo-300 bg-indigo-50' : ''} shadow-sm hover:shadow-md transition-shadow`}
      style={{
        border: isAgent ? undefined : '1px solid ' + borderColor
      }}
    >
      <Handle type="target" position={Position.Top} style={{ visibility: 'hidden' }} />
      <div className="flex items-start gap-3">
        <div
          className="flex items-center justify-center p-2.5 rounded-lg flex-shrink-0"
          style={{ backgroundColor: bgAccent }}
        >
          <Icon className="w-5 h-5" style={{ color: accentColor }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900">{data.label}</p>
          <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">{data.description}</p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ visibility: 'hidden' }} />
    </div>
  );
};

const nodeTypes = {
  activity: ActivityNodeComponent,
};

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const nodeHeight = 100;
  const nodeWidth = 280;
  const verticalGap = 100;
  const horizontalGap = 120;

  const levels: { [key: string]: number } = {};
  const width: { [key: string]: number } = {};

  // Find the depth of each node in the graph
  const calculateLevel = (nodeId: string, visited = new Set()): number => {
    if (visited.has(nodeId)) return 0;
    visited.add(nodeId);

    const incomingEdges = edges.filter(e => e.target === nodeId);
    if (incomingEdges.length === 0) return 0;

    return 1 + Math.max(...incomingEdges.map(e => calculateLevel(e.source, visited)), 0);
  };

  nodes.forEach(node => {
    levels[node.id] = calculateLevel(node.id);
  });

  // Group nodes by level
  const nodesByLevel: { [key: number]: string[] } = {};
  nodes.forEach(node => {
    const level = levels[node.id];
    if (!nodesByLevel[level]) nodesByLevel[level] = [];
    nodesByLevel[level].push(node.id);
  });

  // Position nodes
  return {
    nodes: nodes.map((node) => {
      const level = levels[node.id];
      const levelNodes = nodesByLevel[level];
      const indexInLevel = levelNodes.indexOf(node.id);
      const totalInLevel = levelNodes.length;

      return {
        ...node,
        position: {
          x: (indexInLevel - (totalInLevel - 1) / 2) * (nodeWidth + horizontalGap),
          y: level * (nodeHeight + verticalGap),
        },
      };
    }),
    edges,
  };
};

const ReactFlowWorkflow = ({ activities, stageId, branchConfig }: ReactFlowWorkflowProps) => {
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
        position: { x: 0, y: 0 },
        type: 'activity',
      });

      if (index === 0) {
        newEdges.push({
          id: `start-to-${nodeId}`,
          source: 'start',
          target: nodeId,
          type: 'custom',
        });
      } else if (!branchConfig || !Object.values(branchConfig).some(branches => branches.includes(nodeId))) {
        const prevActivity = activities[index - 1];
        newEdges.push({
          id: `activity-${prevActivity.id}-to-${nodeId}`,
          source: `activity-${prevActivity.id}`,
          target: nodeId,
          type: 'custom',
        });
      }
    });

    if (branchConfig) {
      Object.entries(branchConfig).forEach(([parentId, childIds]) => {
        childIds.forEach((childId) => {
          newEdges.push({
            id: `${parentId}-to-${childId}`,
            source: parentId,
            target: childId,
            type: 'custom',
          });
        });
      });
    }

    const lastActivityId = `activity-${activities[activities.length - 1].id}`;

    newNodes.push({
      id: 'end',
      data: {
        label: 'End',
        type: 'end',
        icon: Check,
        description: 'Workflow complete',
      },
      position: { x: 0, y: 0 },
      type: 'activity',
    });

    if (branchConfig && Object.keys(branchConfig).includes(lastActivityId)) {
      const branchNodeIds = branchConfig[lastActivityId];
      branchNodeIds.forEach((nodeId) => {
        if (nodeId !== 'end') {
          newEdges.push({
            id: `${nodeId}-to-end`,
            source: nodeId,
            target: 'end',
            type: 'custom',
          });
        }
      });
    } else {
      newEdges.push({
        id: `${lastActivityId}-to-end`,
        source: lastActivityId,
        target: 'end',
        type: 'custom',
      });
    }

    const layouted = getLayoutedElements(newNodes, newEdges);
    setNodes(layouted.nodes);
    setEdges(layouted.edges);
  }, [activities, setNodes, setEdges, branchConfig]);

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
