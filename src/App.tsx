import "./App.css";
import { Graph } from "./components/Graph";
import { NodeSidebar } from "./components/NodeSidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { useGraphManager } from "./hooks/use-graph-manager";
import { Toaster } from "sonner";

function App() {
  useGraphManager();

  return (
    <SidebarProvider>
      <SidebarInset>
        <Graph />
      </SidebarInset>
      <NodeSidebar side="right" />
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  );
}

export default App;
