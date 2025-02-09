import { Toaster } from "@/components/ui/sonner";

import Login from "./components/login/Login";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className=" min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <Login />
    </div>
  );
}

export default App;
