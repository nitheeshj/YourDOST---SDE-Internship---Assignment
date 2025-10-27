import React, { useState, useEffect } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // 🔹 Fetch data
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  // 🔹 Filter users
  const filteredUsers = users.filter((user) => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search) ||
      user.username.toLowerCase().includes(search)
    );
  });

  // 🔹 Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (!sortField) return 0;
    const fieldA = a[sortField].toLowerCase();
    const fieldB = b[sortField].toLowerCase();
    return sortOrder === "asc"
      ? fieldA.localeCompare(fieldB)
      : fieldB.localeCompare(fieldA);
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

  // 🔹 Loading spinner
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
        <p className="mt-4 text-lg text-gray-600 font-medium">
          Fetching users...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Header */}
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
        👩‍💻 User Directory
      </h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search by name, username, or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-3/4 md:w-1/2 px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto shadow-lg rounded-xl bg-white">
        <table className="min-w-full border-collapse text-left text-gray-700">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Avatar</th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                Name{" "}
                {sortField === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="px-4 py-3 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                Email{" "}
                {sortField === "email" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.length > 0 ? (
              sortedUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-blue-50 transition duration-200"
                >
                  <td className="px-4 py-3 font-semibold text-gray-600">
                    {user.id}
                  </td>
                  <td className="px-4 py-3">
                    <img
                      src={`https://robohash.org/${user.id}?set=set4&size=50x50`}
                      alt="avatar"
                      className="rounded-full w-10 h-10 border border-gray-300"
                    />
                  </td>
                  <td className="px-4 py-3">{user.name}</td>
                  <td className="px-4 py-3">{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-6 text-gray-500 font-medium"
                >
                  No matching users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        Built with 💙 React + TailwindCSS
      </div>
    </div>
  );
}

export default App;
