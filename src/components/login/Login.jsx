import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "sonner";

const Login = () => {
  const [tab, setTab] = useState("login");

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Refs for inputs
  const loginUsernameRef = useRef(null);
  const loginPasswordRef = useRef(null);
  const signupUsernameRef = useRef(null);
  const signupPasswordRef = useRef(null);

  const handleLogin = async () => {
    if (tab === "login") {
      if (!loginUsername || !loginPassword) {
        toast.error("All fields are required.");
        return;
      }
    } else {
      if (!signupUsername || !signupPassword) {
        toast.error("All fields are required.");
        return;
      }
    }

    await new Promise((res) => setTimeout(res, 1000));
    toast.success(
      "Login Successful! Backend is under maintenance. Try again later."
    );
  };

  // Enhanced keyboard navigation
  const handleKeyDown = (e, inputType) => {
    if (e.key === "Enter" || e.key === "ArrowDown") {
      e.preventDefault();

      if (tab === "login") {
        if (inputType === "username") {
          loginPasswordRef.current.focus();
        } else if (inputType === "password" && e.key === "Enter") {
          handleLogin();
        }
      } else {
        if (inputType === "username") {
          signupPasswordRef.current.focus();
        } else if (inputType === "password" && e.key === "Enter") {
          handleLogin();
        }
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();

      if (tab === "login") {
        if (inputType === "password") {
          loginUsernameRef.current.focus();
        }
      } else {
        if (inputType === "password") {
          signupUsernameRef.current.focus();
        }
      }
    }
  };

  return (
    <div className="relative h-[80vh] flex justify-center items-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md px-4"
      >
        <Tabs defaultValue="login" className="w-full" onValueChange={setTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Welcome Back
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="login-username">Username</Label>
                    <div className="mt-3">
                      <Input
                        id="login-username"
                        ref={loginUsernameRef}
                        placeholder="Enter your username"
                        value={loginUsername}
                        onChange={(e) => setLoginUsername(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "username")}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div className="relative">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative mt-3">
                      <Input
                        id="login-password"
                        ref={loginPasswordRef}
                        placeholder="Enter your password"
                        type={showLoginPassword ? "text" : "password"}
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "password")}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 pr-10 transition-colors duration-200"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                      >
                        {showLoginPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      className="w-full mt-3  bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-500 hover:to-gray-600 transition-all duration-200"
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>

          {/* SIGNUP TAB */}
          <TabsContent value="signup">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="shadow-lg rounded-2xl border-0">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">
                    Create an Account
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="signup-username">Username</Label>
                    <div className="mt-3">
                      <Input
                        id="signup-username"
                        ref={signupUsernameRef}
                        placeholder="Choose a username"
                        value={signupUsername}
                        onChange={(e) => setSignupUsername(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "username")}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 transition-colors duration-200"
                      />
                    </div>
                  </div>
                  <div className="relative ">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative mt-3">
                      <Input
                        id="signup-password"
                        ref={signupPasswordRef}
                        placeholder="Create a password"
                        type={showSignupPassword ? "text" : "password"}
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, "password")}
                        className="focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 pr-10 transition-colors duration-200"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() =>
                          setShowSignupPassword(!showSignupPassword)
                        }
                      >
                        {showSignupPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      className="w-full mt-3 bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-500 hover:to-gray-600 transition-all duration-200"
                      onClick={handleLogin}
                    >
                      Sign Up
                    </Button>
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default Login;
