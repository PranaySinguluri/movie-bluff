import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Button } from "react-bootstrap";
import "../assets/AdminPage.css";

function Admin({ homePath = "/home" }) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Load users and check admin access
  useEffect(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (currentUser?.role !== "admin") {
        navigate(homePath);
        return;
      }

      const rawUsers = JSON.parse(localStorage.getItem("users")) || [];
      // Validate and map users, ensuring role is defined
      const usersWithRoles = Array.isArray(rawUsers)
        ? rawUsers
            .filter((user) => user && typeof user === "object" && user.email && user.username) // Filter invalid users
            .map((user) => ({
              ...user,
              role: user.role === "admin" ? "admin" : "user", // Default to "user" if role is undefined
            }))
        : [];
      setUsers(usersWithRoles);
      setIsLoading(false);
    } catch (error) {
      console.error("Error accessing localStorage:", error);
      setUsers([]);
      setIsLoading(false);
      navigate(homePath);
    }
  }, [navigate, homePath]);

  // Update a user's role
  const handleRoleChange = (index) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) =>
        i === index
          ? { ...user, role: user.role === "admin" ? "user" : "admin" }
          : user
      )
    );
  };

  // Save all users to localStorage
  const handleSave = () => {
    try {
      localStorage.setItem("users", JSON.stringify(users));
      alert("Changes saved successfully!");
    } catch (error) {
      alert("Error saving changes: " + error.message);
    }
  };

  // Delete a user
  const handleDelete = (index) => {
    if (window.confirm(`Are you sure you want to delete ${users[index].username}?`)) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      try {
        localStorage.setItem("users", JSON.stringify(updatedUsers));
      } catch (error) {
        alert("Error deleting user: " + error.message);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="admin-container">
        <h2 className="admin-title">Admin Page</h2>
        <div className="admin-description">
          <h4>Manage Users and their Roles</h4>
          <p>You can change user roles and delete users from here.</p>
        </div>
        {isLoading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table className="admin-table">
            <thead className="admin-table-header">
              <tr className="admin-table-row">
                <th>Email</th>
                <th>Username</th>
                <th>Admin</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.email || `user-${index}`} className="admin-table-row">
                  <td>{user.email}</td>
                  <td>{user.username}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={user.role === "admin"} // Simplified, as role is guaranteed to be "admin" or "user"
                      disabled={user.username === "admin"}
                      onChange={() => handleRoleChange(index)}
                      className="form-check-input"
                    />
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      className="delete-button"
                      onClick={() => handleDelete(index)}
                      disabled={user.username === "admin"}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {!isLoading && users.length > 0 && (
          <div className="save-button-container">
            <Button className="save-button" onClick={handleSave}>
              Save All Changes
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Admin;