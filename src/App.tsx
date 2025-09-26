import "./App.css";
import { Graph } from "./components/Graph";
import { NodeSidebar } from "./components/nodeSidebar";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <Graph />
      <NodeSidebar></NodeSidebar>
    </SidebarProvider>
  );
}

export default App;
