import { FC, useCallback, useRef, useState, MouseEvent, DragEvent } from "react";
import ReactFlow, {
    Background,
    BackgroundVariant,
    Connection,
    Controls,
    Edge,
    Node,
    ReactFlowInstance,
    XYPosition,
    addEdge,
    useEdgesState,
    useNodesState,
} from "reactflow";
import { Box, styled } from "@mui/material";
import { NodeType } from "../_types/nodeType";
import { TERMINAL_NODE } from "../_constants/terminalNode";
import customNodeType from "../_constants/customNodeType";
import useOption, { addOption, deleteOption } from "../_hooks/useOptions";
import useIncomerOrder, { addOrder, changeOrder, deleteNodeOrder, deleteOrderFromNode } from "../_hooks/useIncomerOrder";
import { createNodeInfo } from "../_utils/node";
import WidgetsPanel from "./WidgetsPanel";
import SettingPanel from "./SettingPanel";

const Container = styled(Box)(() => ({
    "&": {
        height: "calc(100vh - 68.5px)",
        width: "100%",
    },
}));

interface WorkspaceProps {
    initialNodes?: Node[];
    initialEdges?: Edge[];
}

const Workspace: FC<WorkspaceProps> = (props) => {
    const { initialNodes = [TERMINAL_NODE], initialEdges = [] } = props;

    const [options, optionDispatch] = useOption();
    const [orders, orderDispatch] = useIncomerOrder();

    const [nodes, setNodes, onNodeChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgeChange] = useEdgesState(initialEdges);

    const containerRef = useRef<HTMLDivElement>(null);
    const [reactflowInstance, setReactflowInstance] = useState<ReactFlowInstance | null>(null);
    const [selectedNodeId, setSelectedNodeId] = useState<string>();

    const handleOnWidgetDragOver = useCallback((event: DragEvent) => {
        event.preventDefault();
    }, []);

    const handleOnWidgetDrop = useCallback(
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
            orderDispatch(addOrder(newNode.id));
        },
        [reactflowInstance, containerRef.current, optionDispatch, orderDispatch]
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
        [orders, orderDispatch, setEdges]
    );

    const handleOnNodesDelete = useCallback(
        (nodes: Node[]) => {
            const ids = nodes.map((node) => node.id);
            setSelectedNodeId(undefined);
            orderDispatch(deleteNodeOrder(ids));
            optionDispatch(deleteOption(ids));
        },
        [optionDispatch, orderDispatch, setSelectedNodeId]
    );

    const handleOnEdgesDelete = useCallback(
        (edges: Edge[]) => {
            orderDispatch(deleteOrderFromNode(edges));
        },
        [orderDispatch]
    );

    const handleOnNodeClick = useCallback(
        (_event: MouseEvent, node: Node) => {
            setSelectedNodeId(node.id);
        },
        [setSelectedNodeId]
    );

    const handleOnPanelClose = useCallback(() => {
        setSelectedNodeId(undefined);
    }, [setSelectedNodeId]);

    return (
        <Container ref={containerRef}>
            <ReactFlow
                defaultViewport={{ x: 300, y: 100, zoom: 1 }}
                deleteKeyCode="Delete"
                edges={edges}
                multiSelectionKeyCode={null}
                nodes={nodes}
                nodeTypes={customNodeType}
                selectionKeyCode={null}
                onDragOver={handleOnWidgetDragOver}
                onDrop={handleOnWidgetDrop}
                onInit={setReactflowInstance}
                onEdgesChange={onEdgeChange}
                onNodesChange={onNodeChange}
                onNodeClick={handleOnNodeClick}
                onConnect={handleOnConnect}
                onNodesDelete={handleOnNodesDelete}
                onEdgesDelete={handleOnEdgesDelete}
            >
                <WidgetsPanel />
                <SettingPanel selected={selectedNodeId} onClose={handleOnPanelClose} />
                <Background variant={BackgroundVariant.Dots} />
                <Controls />
            </ReactFlow>
        </Container>
    );
};

export default Workspace;
