import React, { useState, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Connection,
} from "reactflow";
import "reactflow/dist/style.css";
import { useUserContext } from "../context/UserContext";

const UserVisualization: React.FC = () => {
  const { users } = useUserContext();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const userNodes = users.map((user, index) => ({
      id: user.id,
      type: "default",
      data: { label: `${user.username} (${user.age})` },
      position: { x: 250 * (index % 3), y: 100 * Math.floor(index / 3) },
    }));

    setNodes(userNodes);
  }, [users]);

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const hobby = event.dataTransfer.getData("hobby");
    const nodeId = event.target.getAttribute("data-id");

    if (nodeId && hobby) {
      const hobbyId = `${nodeId}-${hobby}`;

      setNodes((nds) => [
        ...nds,
        {
          id: hobbyId,
          type: "default",
          data: { label: hobby },
          position: { x: Math.random() * 200 + 50, y: Math.random() * 200 + 50 },
        },
      ]);

      setEdges((eds) => [
        ...eds,
        { id: `edge-${nodeId}-${hobby}`, source: nodeId, target: hobbyId },
      ]);
    }
  };

  return (
    <div
      style={{
        flex: 1,
        height: "70vh",
        border: "1px solid #ddd",
        position: "relative",
      }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
      />
    </div>
  );
};

export default UserVisualization;
