"use client";

import { FC, DragEvent, useState, useCallback, useRef, MouseEvent, useMemo, ComponentType } from "react";
import { Button, Paper, styled } from "@mui/material";
import {
    ReactFlow,
    Background,
    Controls,
    Node,
    applyNodeChanges,
    NodeChange,
    ReactFlowInstance,
    XYPosition,
    Edge,
    applyEdgeChanges,
    EdgeChange,
    addEdge,
    Connection,
    ReactFlowProvider,
    NodeProps,
    useNodesState,
    useEdgesState,
} from "reactflow";
import { NodeOption, NodeType } from "@/types/generator";
import { TERMINAL_NODE, TERMINAL_NODE_OPTION, createNodeInfo, generate } from "@/util/generator";
import SettingPanel from "./SettingPanel";
import WidgetsPanel from "./WidgetsPanel";
import ControllerPanel from "./ControllerPanel";
import FixedValueNodeType from "@/components/node_type/FixedValueNodeType";
import TerminalNodeType from "@/components/node_type/TerminalNodeType";
import useIncomerOrder, { registerOrder, AddOrder } from "../_hooks/useIncomerOrder";
import useOption, { addOption } from "../_hooks/useOptions";
import RandomNumberNodeType from "@/components/node_type/RandomNumberNodeType";
import CounterNodeType from "@/components/node_type/CounterNodeType";
import PaddingNodeType from "@/components/node_type/PaddingNodeType";

const customNodeType: Record<string, ComponentType<NodeProps>> = {
    [NodeType.TERMINAL]: TerminalNodeType,
    [NodeType.COUNTER]: CounterNodeType,
    [NodeType.FIXED_VALUE]: FixedValueNodeType,
    [NodeType.RANDOM_NUMBER]: RandomNumberNodeType,
    [NodeType.PADDING]: PaddingNodeType,
};

const WorkspaceRoot = styled("div")(() => ({
    "&": {
        height: "calc(100vh - 68.5px)",
    },
}));

const Workspace: FC = () => {
    const [_orders, orderDispatch] = useIncomerOrder();
    const [options, optionDispatch] = useOption();
    const [nodes, setNodes, onNodeChange] = useNodesState([TERMINAL_NODE]);
    const [edges, setEdges, onEdgeChange] = useEdgesState([]);

    const workspaceRef = useRef<HTMLDivElement>(null);
    const [reactflowInstance, setReactflowInstance] = useState<ReactFlowInstance | null>(null);

    // additional info
    const [selectedNodeId, setSelectedNodeId] = useState<string>();

    const handleOnToolbarDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
    }, []);

    const handleOnToolbarDrop = useCallback(
        (event: DragEvent) => {
            event.preventDefault();

            const { dataTransfer } = event;
            const nodeType: NodeType = NodeType[dataTransfer.getData("create_node") as keyof typeof NodeType];

            if (typeof nodeType === "undefined" || nodeType == null) return;

            const reactFlowBound = workspaceRef.current?.getBoundingClientRect();

            let position: XYPosition = { x: 0, y: 0 };

            if (reactflowInstance && reactFlowBound) {
                position = reactflowInstance.project({
                    x: event.clientX - reactFlowBound.left,
                    y: event.clientY - reactFlowBound.top,
                });
            }

            const [newNode, newOption] = createNodeInfo(nodeType, position);

            setNodes((nds) => [...nds, newNode]);
            optionDispatch(addOption(newOption));
            orderDispatch(registerOrder(newNode.id));
        },
        [reactflowInstance, workspaceRef.current, orderDispatch]
    );

    const handleOnConnect = useCallback(
        (connection: Connection) => {
            const { source, target } = connection;
            if (!source || !target) throw Error("source or target is missing");
            orderDispatch(AddOrder(source, target));
            return setEdges((eds) => addEdge(connection, eds));
        },
        [orderDispatch]
    );

    const handleOnNodeClick = useCallback(
        (_event: MouseEvent, node: Node) => {
            setSelectedNodeId(node.id);
        },
        [options]
    );

    return (
        <WorkspaceRoot ref={workspaceRef}>
            <ReactFlowProvider>
                <ReactFlow
                    edges={edges}
                    nodes={nodes}
                    defaultViewport={{ x: 300, y: 100, zoom: 1 }}
                    onInit={setReactflowInstance}
                    onDragOver={handleOnToolbarDragOver}
                    onDrop={handleOnToolbarDrop}
                    onEdgesChange={onEdgeChange}
                    onNodesChange={onNodeChange}
                    onNodeClick={handleOnNodeClick}
                    onConnect={handleOnConnect}
                    nodeTypes={customNodeType}
                >
                    <WidgetsPanel />
                    <ControllerPanel />
                    <SettingPanel id={selectedNodeId} />
                    <Background />
                    <Controls />
                </ReactFlow>
            </ReactFlowProvider>
        </WorkspaceRoot>
    );
};

export default Workspace;
