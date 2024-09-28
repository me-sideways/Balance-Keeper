import React, { useState, useEffect } from "react";

function App() {
  const [substance, setSubstance] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [mood, setMood] = useState(""); // For button mood selection
  const [notes, setNotes] = useState(""); // For notes field
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }
  }, []);

  const handleAddLog = () => {
    const newLog = { substance, amount, time: new Date().toLocaleString(), mood, notes };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));
    setSubstance("");
    setAmount("");
    setTime("");
    setMood(""); // Clear mood after submission
    setNotes(""); // Clear notes after submission
  };

  const handleClearLogs = () => {
    setLogs([]);
    localStorage.removeItem("logs");
  };

  const downloadCSV = () => {
    const headers = ['Substance', 'Amount', 'Time', 'Mood', 'Notes'];
    const csvRows = [headers];

    logs.forEach(log => {
      csvRows.push([log.substance, log.amount, log.time, log.mood, log.notes]);
    });

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.setAttribute('download', 'logs.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const moodButtons = [
    { label: '🌅 Starting my day', value: '🌅 Starting my day', color: '#ffcc80' },
    { label: '😟 Anxious', value: '😟 Anxious', color: '#ffab91' },
    { label: '🌙 Can\'t sleep', value: '🌙 Can\'t sleep', color: '#80deea' },
    { label: '😫 Stressed', value: '😫 Stressed', color: '#ff8a80' },
    { label: '😔 Depressed', value: '😔 Depressed', color: '#b39ddb' },
    { label: '😊 Everything is good', value: '😊 Everything is good', color: '#a5d6a7' }
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Substance Tracker</h2>
      <div style={{ marginBottom: "20px" }}>
        <label>Substance: </label>
        <input
          type="text"
          value={substance}
          onChange={(e) => setSubstance(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Amount: </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Time: </label>
        <input
          type="text"
          placeholder="HH:MM"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          style={{ padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Mood: </label>
        <div style={{ marginTop: "10px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
          {moodButtons.map(button => (
            <button
              key={button.value}
              onClick={() => setMood(button.value)}
              style={{
                padding: "10px 15px",
                backgroundColor: mood === button.value ? button.color : "#f0f0f0",
                color: mood === button.value ? "#fff" : "#333",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.3s",
                flexGrow: 1
              }}
            >
              {button.label}
            </button>
          ))}
        </div>
        <p style={{ marginTop: "10px" }}>Selected Mood: <strong>{mood || "None"}</strong></p>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Notes: </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{ padding: "10px", width: "100%", height: "80px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handleAddLog} style={buttonStyle}>Add Log</button>
        <button onClick={handleClearLogs} style={buttonStyle}>Clear Logs</button>
        <button onClick={downloadCSV} style={buttonStyle}>Download CSV</button>
      </div>
      <h3 style={{ marginTop: "30px", color: "#555" }}>Usage Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #eee", borderRadius: "5px" }}>
            <strong>{log.substance}</strong> - {log.amount} at {log.time}
            <br /> Mood: {log.mood}
            <br /> Notes: {log.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 15px",
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  transition: "background-color 0.3s",
  width: "30%"
};

export default App;
