import { Toaster } from "sonner";
import "./App.css";
import { Graph } from "./components/Graph";
import { NodeSidebar } from "./components/NodeSidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { useGraphManager } from "./hooks/use-graph-manager";
import { Toaster } from "sonner";
import useGamebookStore from "./lib/stores/gamebook.store";

function App() {
  useGraphManager();

  return (
    <SidebarProvider>
      <NodeSidebar variant="inset" />
      <SidebarInset className="overflow-hidden">
        <Graph />
      </SidebarInset>
      <Toaster position="top-center" richColors />
    </SidebarProvider>
  );
}

export default App;
