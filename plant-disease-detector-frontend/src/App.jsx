import { useState } from "react";
import axios from "axios";

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.error) {
        setAnalysisResult(`Error: ${response.data.error}`);
      } else {
        setAnalysisResult(response.data.analysis);
      }
    } catch (error) {
      setAnalysisResult("Error processing image. Please try again.");
    }
  };

  return (
    <div>
      <h1>Plant Disease Detection</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Image</button>

      <h2>Analysis Result:</h2>
      <p>{analysisResult}</p>
    </div>
  );
}

export default App;
