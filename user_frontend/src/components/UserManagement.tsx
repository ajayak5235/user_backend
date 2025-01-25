import React, { useState } from "react";
import { useUserContext } from "../context/UserContext";

interface UserFormData {
  username: string;
  age: string;
  hobbies: string[];
}

const UserManagement: React.FC = () => {
  const { users, createUser, updateUser, deleteUser } = useUserContext();
  const [formData, setFormData] = useState<UserFormData>({ username: "", age: "", hobbies: [] });
  const [editingUserId, setEditingUserId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "hobbies") {
      setFormData({ ...formData, hobbies: value.split(",").map((hobby) => hobby.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
      username: formData.username,
      age: Number.parseInt(formData.age),
      hobbies: formData.hobbies,
    };

    if (editingUserId) {
      updateUser(editingUserId, userData);
    } else {
      createUser(userData);
    }

    setFormData({ username: "", age: "", hobbies: [] });
    setEditingUserId(null);
  };

  const handleEdit = (user: any) => {
    setFormData({
      username: user.username,
      age: user.age.toString(),
      hobbies: user.hobbies,
    });
    setEditingUserId(user.id);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(id);
    }
  };

  return (
<div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
  <h2>User Management</h2>
  <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
    <input
      type="text"
      name="username"
      value={formData.username}
      onChange={handleInputChange}
      placeholder="Username"
      required
      style={{ display: "block", margin: "10px auto", width: "80%", padding: "8px" }}
    />
    <input
      type="number"
      name="age"
      value={formData.age}
      onChange={handleInputChange}
      placeholder="Age"
      required
      style={{ display: "block", margin: "10px auto", width: "80%", padding: "8px" }}
    />
    <textarea
      name="hobbies"
      value={formData.hobbies.join(", ")}
      onChange={handleInputChange}
      placeholder="Hobbies (comma-separated)"
      style={{ display: "block", margin: "10px auto", width: "80%", padding: "8px" }}
    />
    <button
      type="submit"
      style={{
        display: "block",
        margin: "10px auto",
        padding: "10px 20px",
        backgroundColor: "#007BFF",
        color: "#FFF",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      {editingUserId ? "Update User" : "Create User"}
    </button>
  </form>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
      textAlign: "left",
    }}
  >
    <thead>
      <tr>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Username</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Age</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Hobbies</th>
        <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.username}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>{user.age}</td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            {(user.hobbies || []).join(", ")}
          </td>
          <td style={{ padding: "10px", border: "1px solid #ddd" }}>
            <button
              onClick={() => handleEdit(user)}
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                backgroundColor: "#28A745",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(user.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#DC3545",
                color: "#FFF",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

  );
};

export default UserManagement;
