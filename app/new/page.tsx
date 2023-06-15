"use client";

import { FC, DragEvent, useState, useCallback, useRef, MouseEvent, ComponentType } from "react";
import { Box, styled } from "@mui/material";
import {
    ReactFlow,
    Background,
    Controls,
    Node,
    ReactFlowInstance,
    XYPosition,
    Edge,
    addEdge,
    Connection,
    NodeProps,
    useNodesState,
    useEdgesState,
} from "reactflow";
import { NodeType } from "@/types/generator";
import { TERMINAL_NODE, createNodeInfo } from "@/util/generator";
import SettingPanel from "./_components/SettingPanel";
import WidgetsPanel from "./_components/WidgetsPanel";
import ControllerPanel from "./_components/ControllerPanel";
import FixedValueNodeType from "@/components/node_type/FixedValueNodeType";
import TerminalNodeType from "@/components/node_type/TerminalNodeType";
import useIncomerOrder, { registerOrder, changeOrder, deleteNodeOrder, deleteOrderFromNode } from "./_hooks/useIncomerOrder";
import useOption, { addOption, deleteOption } from "./_hooks/useOptions";
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

const Container = styled(Box)(() => ({
    "&": {
        height: "calc(100vh - 68.5px)",
    },
}));

const Workspace: FC = () => {
    const [orders, orderDispatch] = useIncomerOrder();
    const [options, optionDispatch] = useOption();
    const [nodes, setNodes, onNodeChange] = useNodesState([TERMINAL_NODE]);
    const [edges, setEdges, onEdgeChange] = useEdgesState([]);

    const containerRef = useRef<HTMLDivElement>(null);
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

            const reactFlowBound = containerRef.current?.getBoundingClientRect();

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
        [reactflowInstance, containerRef.current, orderDispatch]
    );

    const handleOnConnect = useCallback(
        (connection: Connection) => {
            const { source, target } = connection;
            if (!source || !target) throw Error("source or target is missing");
            const order = orders[target];
            if (!order) throw Error("order has not been initiate");
            if (!order.includes(target)) {
                orderDispatch(changeOrder(target, [...order, source]));
                setEdges((eds) => addEdge(connection, eds));
            }
        },
        [orderDispatch, orders]
    );

    const handleOnNodeClick = useCallback(
        (_event: MouseEvent, node: Node) => {
            setSelectedNodeId(node.id);
        },
        [options]
    );

    const handleOnPanelClose = useCallback(() => {
        setSelectedNodeId(undefined);
    }, [setSelectedNodeId]);

    const handleOnNodesDelete = useCallback(
        (nodes: Node[]) => {
            const ids = nodes.map((node) => node.id);
            orderDispatch(deleteNodeOrder(ids));
            optionDispatch(deleteOption(ids));
        },
        [optionDispatch]
    );

    const handleOnEdgesDelete = useCallback(
        (edges: Edge[]) => {
            orderDispatch(deleteOrderFromNode(edges));
        },
        [orderDispatch, orders]
    );

    return (
        <Container ref={containerRef}>
            <ReactFlow
                defaultViewport={{ x: 300, y: 100, zoom: 1 }}
                edges={edges}
                nodes={nodes}
                deleteKeyCode="Delete"
                selectionKeyCode={null}
                multiSelectionKeyCode={null}
                nodeTypes={customNodeType}
                onInit={setReactflowInstance}
                onDragOver={handleOnToolbarDragOver}
                onDrop={handleOnToolbarDrop}
                onEdgesChange={onEdgeChange}
                onNodesChange={onNodeChange}
                onNodeClick={handleOnNodeClick}
                onConnect={handleOnConnect}
                onNodesDelete={handleOnNodesDelete}
                onEdgesDelete={handleOnEdgesDelete}
            >
                <WidgetsPanel />
                {/* <ControllerPanel /> */}
                <SettingPanel id={selectedNodeId} onClose={handleOnPanelClose} />
                <Background />
                <Controls />
            </ReactFlow>
        </Container>
    );
};

export default Workspace;
