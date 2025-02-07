import { Toaster } from "@/components/ui/toaster";
import Login from "./components/login/Login";

function App() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <Login />
      <Toaster />
    </div>
  );
}

export default App;
