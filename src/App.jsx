import { Toaster } from "@/components/ui/sonner";

import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className=" min-h-screen flex flex-col  bg-gradient-to-br from-white to-gray-100">
      <Toaster />
      <Navbar />

      <Outlet />
    </div>
  );
}

export default App;
