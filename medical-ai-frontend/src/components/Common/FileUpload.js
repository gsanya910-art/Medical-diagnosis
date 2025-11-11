import React, { useCallback, useState } from "react";
import { Upload, X } from "lucide-react";

const FileUpload = ({
  onFileSelect,
  acceptedTypes = "image/*",
  maxSize = 5 * 1024 * 1024,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const validateFile = (file) => {
    if (!file.type.startsWith("image/")) {
      return "Please select an image file";
    }
    if (file.size > maxSize) {
      return `File size must be less than ${maxSize / 1024 / 1024}MB`;
    }
    return "";
  };

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      setError("");

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        const file = files[0];
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect, maxSize]
  );

  const handleFileInput = useCallback(
    (e) => {
      setError("");
      const file = e.target.files[0];
      if (file) {
        const validationError = validateFile(file);
        if (validationError) {
          setError(validationError);
          return;
        }
        setSelectedFile(file);
        onFileSelect(file);
      }
    },
    [onFileSelect, maxSize]
  );

  const removeFile = useCallback(() => {
    setSelectedFile(null);
    setError("");
    onFileSelect(null);
  }, [onFileSelect]);

  return (
    <div className="w-full">
      <div
        className={`file-upload-area rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
          dragOver
            ? "drag-over border-primary-500 bg-primary-50"
            : "border-gray-300 bg-gray-50"
        } ${error ? "border-red-300 bg-red-50" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          id="file-input"
          type="file"
          accept={acceptedTypes}
          onChange={handleFileInput}
          className="hidden"
        />

        {!selectedFile ? (
          <div className="space-y-4">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="space-y-2">
              <p className="text-lg font-medium text-gray-900">
                Upload Chest X-ray Image
              </p>
              <p className="text-sm text-gray-500">
                Drag and drop your file here or click to browse
              </p>
              <p className="text-xs text-gray-400">
                Supported formats: JPEG, PNG • Max size: 5MB
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 bg-white rounded-lg border">
            <div className="flex items-center space-x-4">
              <img
                src={URL.createObjectURL(selectedFile)}
                alt="Preview"
                className="h-16 w-16 object-cover rounded border"
              />
              <div className="text-left">
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeFile();
              }}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center">
          <X className="h-4 w-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
