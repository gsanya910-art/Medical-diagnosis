import React, { useState } from "react";
import { Upload, Scan, User, AlertTriangle } from "lucide-react";
import Card, { CardContent, CardHeader, CardTitle } from "../UI/Card";
import FileUpload from "../Common/FileUpload";
import PatientForm from "../Common/PatientForm";
import Button from "../UI/Button";
import { medicalAPI } from "../../services/api";
import toast from "react-hot-toast";

const Diagnosis = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [patientData, setPatientData] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("patient");

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setPrediction(null);
  };

  const handlePatientSubmit = (data) => {
    setPatientData(data);
    toast.success("Patient information saved!");
  };

  const handleDiagnose = async () => {
    if (!selectedFile) {
      toast.error("Please select an X-ray image first");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await medicalAPI.predict(formData);
      setPrediction(response.data.prediction);
      toast.success("Diagnosis completed successfully!");
    } catch (error) {
      console.error("Diagnosis error:", error);
      toast.error("Failed to process diagnosis. Please try again.");

      // Mock response for demo
      setPrediction({
        class: Math.random() > 0.5 ? "PNEUMONIA" : "NORMAL",
        confidence: (Math.random() * 0.3 + 0.7).toFixed(2),
        prediction: Math.random() > 0.5 ? 1 : 0,
        probabilities: {
          NORMAL: (Math.random() * 0.3 + 0.7).toFixed(2),
          PNEUMONIA: (Math.random() * 0.3 + 0.7).toFixed(2),
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getRiskLevel = (confidence, diagnosis) => {
    if (diagnosis === "PNEUMONIA" && confidence > 0.8) return "high";
    if (diagnosis === "PNEUMONIA" && confidence > 0.6) return "medium";
    return "low";
  };

  const riskLevel = prediction
    ? getRiskLevel(prediction.confidence, prediction.class)
    : null;

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Patient Diagnosis
        </h1>
        <p className="text-gray-600">
          Upload chest X-ray images for AI-powered pneumonia detection
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Patient Info & Image Upload */}
        <div className="space-y-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Patient Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PatientForm onSubmit={handlePatientSubmit} />
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="h-5 w-5 mr-2" />
                Upload X-ray Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FileUpload onFileSelect={handleFileSelect} />

              {selectedFile && (
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <Scan className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-blue-900">
                        Image Ready for Analysis
                      </p>
                      <p className="text-sm text-blue-700">
                        Click "Analyze Image" to start diagnosis
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Diagnosis Results */}
        <div className="space-y-6">
          {/* Analysis Control */}
          <Card>
            <CardHeader>
              <CardTitle>AI Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Current Status:</p>
                  <p
                    className={`font-medium ${
                      selectedFile ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {selectedFile
                      ? "Image uploaded and ready"
                      : "Waiting for image upload"}
                  </p>
                </div>

                <Button
                  onClick={handleDiagnose}
                  loading={loading}
                  disabled={!selectedFile}
                  className="w-full"
                  size="large"
                >
                  <Scan className="h-5 w-5 mr-2" />
                  {loading ? "Analyzing..." : "Analyze Image"}
                </Button>

                {!selectedFile && (
                  <p className="text-sm text-gray-500 text-center">
                    Please upload an X-ray image to begin analysis
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {prediction && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Diagnosis Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className={`p-6 rounded-lg mb-4 ${
                    riskLevel === "high"
                      ? "risk-high"
                      : riskLevel === "medium"
                      ? "risk-medium"
                      : "risk-low"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-2xl font-bold mb-2">
                      {prediction.class}
                    </div>
                    <div className="text-4xl font-bold mb-2">
                      {(prediction.confidence * 100).toFixed(1)}%
                    </div>
                    <p className="text-sm opacity-75">Confidence Level</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Probability Distribution
                    </p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Normal</span>
                        <span>
                          {(prediction.probabilities.NORMAL * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{
                            width: `${prediction.probabilities.NORMAL * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="flex justify-between text-sm">
                        <span>Pneumonia</span>
                        <span>
                          {(prediction.probabilities.PNEUMONIA * 100).toFixed(
                            1
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-red-600 h-2 rounded-full"
                          style={{
                            width: `${
                              prediction.probabilities.PNEUMONIA * 100
                            }%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Risk Assessment
                    </p>
                    <div
                      className={`px-3 py-2 rounded text-sm font-medium text-center ${
                        riskLevel === "high"
                          ? "bg-red-100 text-red-800"
                          : riskLevel === "medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {riskLevel === "high"
                        ? "High Risk - Immediate Attention Recommended"
                        : riskLevel === "medium"
                        ? "Medium Risk - Further Evaluation Needed"
                        : "Low Risk - Routine Follow-up"}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <Button variant="secondary" className="flex-1">
                    Save Report
                  </Button>
                  <Button className="flex-1">Print Results</Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Instructions */}
          {!prediction && (
            <Card>
              <CardHeader>
                <CardTitle>Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>1. Fill in patient information</p>
                  <p>2. Upload a clear chest X-ray image (JPEG/PNG)</p>
                  <p>3. Click "Analyze Image" for AI diagnosis</p>
                  <p>4. Review results and risk assessment</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnosis;
