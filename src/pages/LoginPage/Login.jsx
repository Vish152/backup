import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Lock,
  Hospital,
  Calendar,
  Users,
  ClipboardList,
  Settings,
} from "lucide-react";

// API service functions integrated into the component
const apiServices = {
  loginUser: async (credentials, userType) => {
    try {
      const response = await fetch(`/api/${userType}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", userType);
      return data;
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  },

  getDoctorDashboardData: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/doctor/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to fetch dashboard data");
    }
  },

  getReceptionDashboardData: async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/reception/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      return await response.json();
    } catch (error) {
      throw new Error(error.message || "Failed to fetch dashboard data");
    }
  },
};

const DoctorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiServices.getDoctorDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Doctor Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">Today's Appointments</h3>
              <p className="text-2xl">{dashboardData?.appointments || 0}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">Total Patients</h3>
              <p className="text-2xl">{dashboardData?.totalPatients || 0}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <ClipboardList className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold">Pending Reports</h3>
              <p className="text-2xl">{dashboardData?.pendingReports || 0}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const ReceptionDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const data = await apiServices.getReceptionDashboardData();
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reception Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <h3 className="font-semibold">Appointments Today</h3>
              <p className="text-2xl">
                {dashboardData?.todayAppointments || 0}
              </p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <h3 className="font-semibold">New Registrations</h3>
              <p className="text-2xl">{dashboardData?.newRegistrations || 0}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-4">
            <Settings className="h-8 w-8 text-purple-500" />
            <div>
              <h3 className="font-semibold">Pending Queries</h3>
              <p className="text-2xl">{dashboardData?.pendingQueries || 0}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const LoginPage = () => {
  const [activePanel, setActivePanel] = useState("reception");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");
    if (token && userType) {
      setIsLoggedIn(true);
      setActivePanel(userType);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await apiServices.loginUser(formData, activePanel);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    setFormData({ username: "", password: "" });
  };

  if (isLoggedIn) {
    return (
      <div>
        <div className="p-4 flex justify-end">
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
        {activePanel === "doctor" ? (
          <DoctorDashboard />
        ) : (
          <ReceptionDashboard />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white flex items-center gap-2">
          <Hospital className="h-8 w-8" />
          HMS
        </h1>
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant={activePanel === "reception" ? "default" : "outline"}
              onClick={() => {
                setActivePanel("reception");
                setError("");
              }}
              className="w-full"
            >
              Reception Panel
            </Button>
            <Button
              variant={activePanel === "doctor" ? "default" : "outline"}
              onClick={() => {
                setActivePanel("doctor");
                setError("");
              }}
              className="w-full"
            >
              Doctor Panel
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Username"
                  className="pl-10"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  type="password"
                  placeholder="Password"
                  className="pl-10"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : `Login to ${
                    activePanel === "reception" ? "Reception" : "Doctor"
                  } Panel`}
            </Button>
          </form>

          <button className="mt-4 text-sm text-blue-600 hover:text-blue-800 w-full text-center">
            Forgot Password?
          </button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
