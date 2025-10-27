import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched data:", data);
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // 🔹 Filter logic
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search)
    );
  });

  // 🔹 Sort logic (must be right below filter logic)
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();

    if (sortOrder === "asc") return fieldA.localeCompare(fieldB);
    return fieldB.localeCompare(fieldA);
  });

  // 🔹 Sort handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  // 🔹 Your JSX below
  return (
    <div style={{ padding: "20px" }}>
      {/* Search Bar */}
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search by name, username, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            borderRadius: "8px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>

      {/* Table */}
      <table border="1" cellPadding="10" style={{ margin: "20px auto", width: "80%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Avatar</th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("name")}
            >
              Name {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              style={{ cursor: "pointer" }}
              onClick={() => handleSort("email")}
            >
              Email {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
          </tr>
        </thead>

        <tbody>
          {sortedUsers.length > 0 ? (
            sortedUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>
                  <img
                    src={`https://robohash.org/${user.id}?set=set2&size=50x50`}
                    alt="avatar"
                    width="50"
                    style={{ borderRadius: "50%" }}
                  />
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No matching users
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;

