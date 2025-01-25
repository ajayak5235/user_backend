import React, { useState } from "react";

const hobbies = [
  "Cricket",
  "Swimming",
];

const Sidebar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHobbies = hobbies.filter((hobby) =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragStart = (event: React.DragEvent, hobby: string) => {
    event.dataTransfer.setData("hobby", hobby);
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#f5f5f5",
        padding: "16px",
        overflowY: "auto",
        borderRight: "1px solid #ddd",
      }}
    >
      <h2 style={{ fontSize: "10px", fontWeight: "bold", marginBottom: "5px" }}>
        Hobbies
      </h2>
      <input
        type="text"
        placeholder="Search hobbies..."
        style={{
          width: "100%",
          padding: "8px",
          marginBottom: "5px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {filteredHobbies.map((hobby) => (
          <li
            key={hobby}
            style={{
              marginBottom: "5px",
              padding: "8px",
              backgroundColor: "#fff",
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              cursor: "move",
            }}
            draggable
            onDragStart={(e) => onDragStart(e, hobby)}
          >
            {hobby}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
