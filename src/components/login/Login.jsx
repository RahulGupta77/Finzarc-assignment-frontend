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
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BACKEND_API } from "../../constants";

const Login = () => {
  const [tab, setTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
    setIsLoading(true);
    try {
      if (tab === "login") {
        if (!loginUsername || !loginPassword) {
          toast.error("All fields are required.");
          return;
        }

        const response = await fetch(`${BACKEND_API}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: loginUsername,
            password: loginPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Login failed.");
          return;
        }

        toast.success("Login successful.");
        localStorage.setItem("user", "true");
        navigate("/user");
      } else {
        if (!signupUsername || !signupPassword) {
          toast.error("All fields are required.");
          return;
        }

        const response = await fetch(`${BACKEND_API}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: signupUsername,
            password: signupPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Signup failed.");
          return;
        }

        toast.success("Signup successful. Please log in.");
        setTab("login");
        setSignupUsername("");
        setSignupPassword("");
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
        <Tabs value={tab} onValueChange={setTab} className="w-full">
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        disabled={isLoading}
                      >
                        {showLoginPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-500 hover:to-gray-600 transition-all duration-200"
                      onClick={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                          ></path>
                        </svg>
                      ) : null}
                      {isLoading ? "Processing..." : "Login"}
                    </Button>
                  </motion.div>
                  <p className="text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setTab("signup")}
                    >
                      Create one
                    </button>
                  </p>
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
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  <div className="relative">
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
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() =>
                          setShowSignupPassword(!showSignupPassword)
                        }
                        disabled={isLoading}
                      >
                        {showSignupPassword ? <FiEyeOff /> : <FiEye />}
                      </button>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col gap-3">
                  <motion.div whileTap={{ scale: 0.98 }} className="w-full">
                    <Button
                      className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-500 hover:to-gray-600 transition-all duration-200"
                      onClick={handleLogin}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <svg
                          className="animate-spin h-5 w-5 mr-2 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                          ></path>
                        </svg>
                      ) : null}
                      {isLoading ? "Processing..." : "Sign Up"}
                    </Button>
                  </motion.div>
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-blue-600 hover:underline"
                      onClick={() => setTab("login")}
                    >
                      Log in
                    </button>
                  </p>
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
