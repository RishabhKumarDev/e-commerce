import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <h1  className="text-4xl text-center text-red-700  bg-amber-400">Header Component!!!</h1>
      <div>
      <Outlet/>

      </div>
    </div>
  )
}

export default App;