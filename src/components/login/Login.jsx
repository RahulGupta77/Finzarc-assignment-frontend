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
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const { toast } = useToast();
  const [tab, setTab] = useState("supervisior");
  const [formData, setFormData] = useState({
    supervisior: { name: "", password: "", phone: "" }, // Add phone field
    admin: { name: "", password: "" },
  });
  const [showPassword, setShowPassword] = useState({
    supervisior: false,
    admin: false,
  });

  const handleInputChange = (tab, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [tab]: { ...prev[tab], [field]: value },
    }));
  };

  const handleTogglePassword = (tab) => {
    setShowPassword((prev) => ({
      ...prev,
      [tab]: !prev[tab],
    }));
  };

  const handleLogin = async () => {
    const { name, password, phone } = formData[tab];

    // Validate fields based on the selected tab
    if (tab === "supervisior") {
      if (!name || !password || !phone) {
        toast({
          title: "Error",
          description: "All fields are required!",
          variant: "destructive",
        });
        return;
      }

      // Validate phone number format (e.g., 10 digits)
      if (!/^\d{10}$/.test(phone)) {
        toast({
          title: "Error",
          description: "Phone number must be 10 digits!",
          variant: "destructive",
        });
        return;
      }
    } else if (tab === "admin") {
      if (!name || !password) {
        toast({
          title: "Error",
          description: "All fields are required!",
          variant: "destructive",
        });
        return;
      }
    }

    console.log("Logging in with:", formData[tab]);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
    alert("Login Successful!");
  };

  return (
    <div className="mb-32">
      <Tabs
        defaultValue="supervisior"
        className="w-[400px]"
        onValueChange={setTab}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supervisior">Supervisior</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="supervisior">
          <Card>
            <CardHeader>
              <CardTitle>Enter Supervisior&apos;s Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Name Field */}
              <div className="space-y-1">
                <Label htmlFor="supervisior-name">Supervisior Name</Label>
                <Input
                  id="supervisior-name"
                  placeholder="Enter Name"
                  value={formData.supervisior.name}
                  onChange={(e) =>
                    handleInputChange("supervisior", "name", e.target.value)
                  }
                />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-1">
                <Label htmlFor="supervisior-phone">Phone Number</Label>
                <Input
                  id="supervisior-phone"
                  type="tel"
                  placeholder="Enter Phone Number"
                  value={formData.supervisior.phone}
                  onChange={(e) =>
                    handleInputChange("supervisior", "phone", e.target.value)
                  }
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1 relative">
                <Label htmlFor="supervisior-password">Password</Label>
                <div className="flex items-center">
                  <Input
                    id="supervisior-password"
                    type={showPassword.supervisior ? "text" : "password"}
                    placeholder="Enter Password"
                    value={formData.supervisior.password}
                    onChange={(e) =>
                      handleInputChange(
                        "supervisior",
                        "password",
                        e.target.value
                      )
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-2"
                    onClick={() => handleTogglePassword("supervisior")}
                  >
                    {showPassword.supervisior ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="admin">
          <Card>
            <CardHeader>
              <CardTitle>Enter Admin&apos;s Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="admin-name">Admin Name</Label>
                <Input
                  id="admin-name"
                  placeholder="Enter Name"
                  value={formData.admin.name}
                  onChange={(e) =>
                    handleInputChange("admin", "name", e.target.value)
                  }
                />
              </div>
              <div className="space-y-1 relative">
                <Label htmlFor="admin-password">Password</Label>
                <div className="flex items-center">
                  <Input
                    id="admin-password"
                    type={showPassword.admin ? "text" : "password"}
                    placeholder="Enter Password"
                    value={formData.admin.password}
                    onChange={(e) =>
                      handleInputChange("admin", "password", e.target.value)
                    }
                  />
                  <button
                    type="button"
                    className="absolute right-2"
                    onClick={() => handleTogglePassword("admin")}
                  >
                    {showPassword.admin ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleLogin}>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
