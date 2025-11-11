import React, { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
} from "lucide-react";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";
import Button from "../UI/Button";

const Results = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const patients = [
    {
      id: 1,
      name: "John Smith",
      age: 45,
      gender: "Male",
      date: "2024-01-15",
      status: "NORMAL",
      confidence: 0.89,
      imageUrl: "/sample-xray-1.jpg",
      symptoms: "Mild cough, no fever",
      doctor: "Dr. Wilson",
    },
    {
      id: 2,
      name: "Maria Garcia",
      age: 62,
      gender: "Female",
      date: "2024-01-14",
      status: "PNEUMONIA",
      confidence: 0.94,
      imageUrl: "/sample-xray-2.jpg",
      symptoms: "Fever, cough, breathing difficulty",
      doctor: "Dr. Wilson",
    },
    {
      id: 3,
      name: "Robert Johnson",
      age: 38,
      gender: "Male",
      date: "2024-01-13",
      status: "NORMAL",
      confidence: 0.92,
      imageUrl: "/sample-xray-3.jpg",
      symptoms: "Routine checkup",
      doctor: "Dr. Wilson",
    },
    {
      id: 4,
      name: "Sarah Chen",
      age: 55,
      gender: "Female",
      date: "2024-01-12",
      status: "PNEUMONIA",
      confidence: 0.87,
      imageUrl: "/sample-xray-4.jpg",
      symptoms: "High fever, chest pain",
      doctor: "Dr. Wilson",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    return status === "NORMAL"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "text-green-600";
    if (confidence >= 0.8) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Patient Results
        </h1>
        <p className="text-gray-600">
          View and manage all patient diagnosis records
        </p>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search patients..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="NORMAL">Normal</option>
                <option value="PNEUMONIA">Pneumonia</option>
              </select>
              <Button variant="secondary">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="secondary">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredPatients.map((patient) => (
          <Card key={patient.id} hover className="medical-card">
            <CardContent className="p-6">
              {/* Patient Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {patient.age} years, {patient.gender}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                    patient.status
                  )}`}
                >
                  {patient.status}
                </span>
              </div>

              {/* Diagnosis Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Confidence:</span>
                  <span
                    className={`font-medium ${getConfidenceColor(
                      patient.confidence
                    )}`}
                  >
                    {(patient.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium text-gray-900">
                    {patient.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium text-gray-900">
                    {patient.doctor}
                  </span>
                </div>
              </div>

              {/* Symptoms */}
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Symptoms:</p>
                <p className="text-sm text-gray-900 line-clamp-2">
                  {patient.symptoms}
                </p>
              </div>

              {/* Actions */}
              <div className="flex space-x-2 pt-4 border-t border-gray-200">
                <Button variant="secondary" size="small" className="flex-1">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
                <Button variant="secondary" size="small" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button variant="danger" size="small">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No patients found
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No patient records available yet"}
              </p>
              {(searchTerm || filterStatus !== "all") && (
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setFilterStatus("all");
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-gray-900">
              {patients.length}
            </div>
            <div className="text-sm text-gray-600">Total Patients</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-green-600">
              {patients.filter((p) => p.status === "NORMAL").length}
            </div>
            <div className="text-sm text-gray-600">Normal Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-red-600">
              {patients.filter((p) => p.status === "PNEUMONIA").length}
            </div>
            <div className="text-sm text-gray-600">Pneumonia Cases</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {(
                (patients.filter((p) => p.status === "NORMAL").length /
                  patients.length) *
                100
              ).toFixed(1)}
              %
            </div>
            <div className="text-sm text-gray-600">Accuracy Rate</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Results;
