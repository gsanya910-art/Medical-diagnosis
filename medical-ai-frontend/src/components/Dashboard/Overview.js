import React from "react";
import {
  Users,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
} from "lucide-react";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";

const Overview = () => {
  const stats = [
    {
      title: "Total Patients",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "Pneumonia Cases",
      value: "89",
      change: "+5%",
      trend: "up",
      icon: AlertTriangle,
      color: "red",
    },
    {
      title: "Normal Cases",
      value: "1,158",
      change: "+8%",
      trend: "up",
      icon: CheckCircle,
      color: "green",
    },
    {
      title: "Accuracy Rate",
      value: "96.2%",
      change: "+1.2%",
      trend: "up",
      icon: Activity,
      color: "purple",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      patient: "John Doe",
      status: "Pneumonia",
      time: "2 min ago",
      risk: "high",
    },
    {
      id: 2,
      patient: "Jane Smith",
      status: "Normal",
      time: "5 min ago",
      risk: "low",
    },
    {
      id: 3,
      patient: "Mike Johnson",
      status: "Pneumonia",
      time: "10 min ago",
      risk: "high",
    },
    {
      id: 4,
      patient: "Sarah Wilson",
      status: "Normal",
      time: "15 min ago",
      risk: "low",
    },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "high":
        return "risk-high";
      case "medium":
        return "risk-medium";
      case "low":
        return "risk-low";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Overview
        </h1>
        <p className="text-gray-600">
          Welcome back! Here's what's happening with your patients today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} hover>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                    <p
                      className={`text-sm mt-1 ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change} from last week
                    </p>
                  </div>
                  <div className={`p-3 rounded-full bg-${stat.color}-100`}>
                    <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Diagnoses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${getRiskColor(
                        activity.risk
                      )}`}
                    >
                      <Activity className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {activity.patient}
                      </p>
                      <p className="text-sm text-gray-500">{activity.status}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{activity.time}</p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full ${
                        activity.risk === "high"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {activity.risk} risk
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">AI Model</span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                  Operational
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-900">Database</span>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-sm font-medium rounded">
                  Connected
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <span className="font-medium text-yellow-900">
                    Response Time
                  </span>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded">
                  128ms
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-900">Uptime</span>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded">
                  99.9%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;
