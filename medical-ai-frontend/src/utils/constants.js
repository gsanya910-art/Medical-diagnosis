export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8000";

export const PATIENT_STATUS = {
  NORMAL: "NORMAL",
  PNEUMONIA: "PNEUMONIA",
};

export const RISK_LEVELS = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
};

export const SAMPLE_PATIENTS = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    gender: "Male",
    date: "2024-01-15",
    status: "NORMAL",
    confidence: 0.89,
    imageUrl: "/sample-xray-1.jpg",
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
  },
];
