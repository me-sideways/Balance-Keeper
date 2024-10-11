// SubstanceInput.js
// Component for handling user input of substances.
// Displays buttons for previously entered substances and allows adding new ones.
// NOTE: When pasting this file's contents into the chatbot, this component handles substance input 
// and passes the selected substance to the main App component.

import React from 'react';

const SubstanceInput = ({ substance, setSubstance, substanceButtons }) => (
  <div style={{ marginBottom: "20px" }}>
    <label>Substance: </label>
    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "10px" }}>
      {substanceButtons.map((sub, index) => (
        <button
          key={index}
          onClick={() => setSubstance(sub)}
          style={{
            padding: "10px 15px",
            backgroundColor: substance === sub ? "#007bff" : "#f0f0f0",
            color: substance === sub ? "#fff" : "#333",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {sub}
        </button>
      ))}
    </div>
    <input
      type="text"
      value={substance}
      onChange={(e) => setSubstance(e.target.value)}
      placeholder="Enter new substance"
      style={{ padding: "10px", width: "100%", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
    />
  </div>
);

export default SubstanceInput;
