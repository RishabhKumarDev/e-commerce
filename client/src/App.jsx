import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
