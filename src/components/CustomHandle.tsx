import { Handle, useNodeConnections, type HandleProps } from "@xyflow/react";

interface CustomHandleProps extends HandleProps {
  connectionCount?: number;
}

const CustomHandle = ({ connectionCount, ...props }: CustomHandleProps) => {
  const connections = useNodeConnections({
    handleType: props.type,
  });

  return (
    <Handle
      style={{
        backgroundColor: "#eee",
        border: "1px solid #ddd",
        borderRadius: "50%",
        width: "16px",
        height: "16px",
      }}
      {...props}
      isConnectable={!connectionCount || connections.length < connectionCount}
    />
  );
};

export default CustomHandle;
