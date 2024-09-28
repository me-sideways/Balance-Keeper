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

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
      <h2>Substance Tracker</h2>
      <div>
        <label>Substance: </label>
        <input
          type="text"
          value={substance}
          onChange={(e) => setSubstance(e.target.value)}
        />
      </div>
      <div>
        <label>Amount: </label>
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Time: </label>
        <input
          type="text"
          placeholder="HH:MM"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>
      <div>
        <label>Mood: </label>
        <div style={{ marginBottom: "10px" }}>
          <button onClick={() => setMood("🌅 Starting my day")} style={{ marginRight: "5px" }}>🌅 Starting my day</button>
          <button onClick={() => setMood("😟 Anxious")} style={{ marginRight: "5px" }}>😟 Anxious</button>
          <button onClick={() => setMood("🌙 Can't sleep")} style={{ marginRight: "5px" }}>🌙 Can't sleep</button>
          <button onClick={() => setMood("😫 Stressed")} style={{ marginRight: "5px" }}>😫 Stressed</button>
          <button onClick={() => setMood("😔 Depressed")} style={{ marginRight: "5px" }}>😔 Depressed</button>
          <button onClick={() => setMood("😊 Everything is good")} style={{ marginRight: "5px" }}>😊 Everything is good</button>
        </div>
        <p>Selected Mood: <strong>{mood || "None"}</strong></p>
      </div>
      <div>
        <label>Notes: </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <button onClick={handleAddLog}>Add Log</button>
      <button onClick={handleClearLogs} style={{ marginLeft: "10px" }}>
        Clear Logs
      </button>
      <button onClick={downloadCSV} style={{ marginLeft: "10px" }}>
        Download CSV
      </button>

      <h3>Usage Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <strong>{log.substance}</strong> - {log.amount} at {log.time}
            <br /> Mood: {log.mood}
            <br /> Notes: {log.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
