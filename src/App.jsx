import { Toaster } from "@/components/ui/sonner";

import Login from "./components/login/Login";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Toaster />
      <Login />
    </div>
  );
}

export default App;
