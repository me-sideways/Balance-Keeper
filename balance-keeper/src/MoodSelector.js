// MoodSelector.js
// This component handles mood selection by providing mood buttons that update the selected mood state.
// It also visually indicates the currently selected mood and allows users to choose from predefined moods.



import React from 'react';

const MoodSelector = ({ mood, setMood, moodButtons }) => (
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
);

export default MoodSelector;
