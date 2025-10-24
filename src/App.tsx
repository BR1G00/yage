import "./App.css";
import { Graph } from "./components/Graph";
import { NodeSidebar } from "./components/NodeSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { SidebarProvider } from "./components/ui/sidebar";
import { useGraphManager } from "./hooks/use-graph-manager";

function App() {
  useGraphManager();

  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={75} minSize={30} maxSize={80}>
        <Graph />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={25} minSize={20} maxSize={50}>
        <SidebarProvider>
          <NodeSidebar></NodeSidebar>
        </SidebarProvider>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default App;
