// App.js
// Main application component for the Balance Keeper app.
// Manages state for substance logging (substance, amount, time, mood, notes).
// Handles user inputs, log saving to localStorage, CSV download, and log display.
// NOTE: When pasting this file's contents into the chatbot, this is the main control component. 
// It coordinates other components like SubstanceInput, MoodSelector, and log management.



import React, { useState, useEffect } from "react";
import SubstanceInput from "./SubstanceInput";
import MoodSelector from "./MoodSelector";
import { downloadCSV } from './utils';

function App() {
  const [substance, setSubstance] = useState("");
  const [amount, setAmount] = useState("");
  const [time, setTime] = useState("");
  const [mood, setMood] = useState("");
  const [notes, setNotes] = useState("");
  const [logs, setLogs] = useState([]);
  const [substanceButtons, setSubstanceButtons] = useState([]);

  useEffect(() => {
    const savedLogs = localStorage.getItem("logs");
    if (savedLogs) {
      setLogs(JSON.parse(savedLogs));
    }

    const savedSubstances = localStorage.getItem("substanceButtons");
    if (savedSubstances) {
      setSubstanceButtons(JSON.parse(savedSubstances));
    }
  }, []);

  const handleAddLog = () => {
    const newLog = { substance, amount, time: new Date().toLocaleString(), mood, notes };
    const updatedLogs = [...logs, newLog];
    setLogs(updatedLogs);
    localStorage.setItem("logs", JSON.stringify(updatedLogs));

    if (!substanceButtons.includes(substance)) {
      const updatedSubstances = [...substanceButtons, substance];
      setSubstanceButtons(updatedSubstances);
      localStorage.setItem("substanceButtons", JSON.stringify(updatedSubstances));
    }

    setSubstance("");
    setAmount("");
    setTime("");
    setMood("");
    setNotes("");
  };

  const handleClearLogs = () => {
    setLogs([]);
    localStorage.removeItem("logs");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Balance Keeper</h2>
      
      <SubstanceInput substance={substance} setSubstance={setSubstance} substanceButtons={substanceButtons} />
      
      {/* Amount, Time, Mood, Notes Inputs */}
      <div style={{ marginBottom: "20px" }}>
        <label>Amount: </label>
        <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} style={inputStyle} />
      </div>
      <div style={{ marginBottom: "20px" }}>
        <label>Time: </label>
        <input type="text" placeholder="HH:MM" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
      </div>
      
      <MoodSelector mood={mood} setMood={setMood} moodButtons={moodButtons} />
      
      <div style={{ marginBottom: "20px" }}>
        <label>Notes: </label>
        <textarea value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button onClick={handleAddLog} style={buttonStyle}>Add Log</button>
        <button onClick={handleClearLogs} style={buttonStyle}>Clear Logs</button>
        <button onClick={() => downloadCSV(logs)} style={buttonStyle}>Download CSV</button>
      </div>
      
      <h3 style={{ marginTop: "30px", color: "#555" }}>Usage Logs</h3>
      <ul>
        {logs.map((log, index) => (
          <li key={index} style={logStyle}>
            <strong>{log.substance}</strong> - {log.amount} at {log.time}
            <br /> Mood: {log.mood}
            <br /> Notes: {log.notes}
          </li>
        ))}
      </ul>
    </div>
  );
}

const inputStyle = {
  padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc"
};

const buttonStyle = {
  padding: "10px 15px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer", width: "30%"
};

const logStyle = {
  marginBottom: "15px", padding: "10px", border: "1px solid #eee", borderRadius: "5px"
};

export default App;
