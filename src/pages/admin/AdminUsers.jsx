import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  // Initial mock data
  const initialUsers = [
    {
      id: 1,
      fullName: "John Smith",
      email: "john@example.com",
      mobile: "123-456-7890",
      isActive: 1,
      isBlocked: 0,
    },
    {
      id: 2,
      fullName: "Emma Johnson",
      email: "emma@example.com",
      mobile: "234-567-8901",
      isActive: 1,
      isBlocked: 0,
    },
    {
      id: 3,
      fullName: "Michael Brown",
      email: "michael@example.com",
      mobile: "345-678-9012",
      isActive: 0,
      isBlocked: 1,
    },
    {
      id: 4,
      fullName: "Sarah Davis",
      email: "sarah@example.com",
      mobile: "456-789-0123",
      isActive: 1,
      isBlocked: 0,
    },
    {
      id: 5,
      fullName: "David Wilson",
      email: "david@example.com",
      mobile: "567-890-1234",
      isActive: 0,
      isBlocked: 0,
    },
  ];

  // States
  const [users, setUsers] = useState(initialUsers);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showBlockPopup, setShowBlockPopup] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
    isActive: "1",
    isBlocked: "0",
  });

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Action handlers
  const handleAddUser = () => {
    if (newUser.fullName && newUser.email && newUser.mobile) {
      const userToAdd = {
        ...newUser,
        id: users.length + 1,
        isActive: parseInt(newUser.isActive),
        isBlocked: parseInt(newUser.isBlocked),
      };
      setUsers([...users, userToAdd]);
      setNewUser({
        fullName: "",
        email: "",
        mobile: "",
        isActive: "1",
        isBlocked: "0",
      });
      setShowAddPopup(false);
    }
  };

  const handleEditUser = () => {
    setUsers(
      users.map((user) =>
        user.id === currentUser.id
          ? {
              ...currentUser,
              isActive: parseInt(currentUser.isActive),
              isBlocked: parseInt(currentUser.isBlocked),
            }
          : user,
      ),
    );
    setShowEditPopup(false);
  };

  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== currentUser.id));
    setShowDeletePopup(false);
  };

  const handleBlockToggle = () => {
    setUsers(
      users.map((user) =>
        user.id === currentUser.id
          ? { ...user, isBlocked: user.isBlocked === 1 ? 0 : 1 }
          : user,
      ),
    );
    setShowBlockPopup(false);
  };

  // Popup handlers
  const openEditPopup = (user) => {
    setCurrentUser({ ...user });
    setShowEditPopup(true);
  };

  const openDeletePopup = (user) => {
    setCurrentUser(user);
    setShowDeletePopup(true);
  };

  const openBlockPopup = (user) => {
    setCurrentUser(user);
    setShowBlockPopup(true);
  };

  // Status badge component
  const StatusBadge = ({ isActive }) => {
    return isActive === 1 ? (
      <span className="bg-mint-frost text-emerald-leaf px-3 py-1 rounded-full text-xs font-semibold">
        Active
      </span>
    ) : (
      <span className="bg-silver-fog text-slate-mist px-3 py-1 rounded-full text-xs font-semibold">
        Inactive
      </span>
    );
  };

  useEffect(() => {
    const userToken = localStorage.getItem("sessionToken");
    const userRole = localStorage.getItem("userRole");
    if (!userToken && !userRole) {
      navigate("/");
      return;
    }
    if (userRole !== "admin" && userToken) {
      navigate("/main");
    }
  }, [navigate]);
  return (
    <div className="bg-cloud-white page">
      <div>
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-midnight-gray text-3xl font-bold">
            User Management
          </h1>
          <button
            onClick={() => setShowAddPopup(true)}
            className="bg-oceanic-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-royal-azure transition-colors"
          >
            Add New User
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-sky-mist border-b-2 border-silver-fog">
                <th className="p-4 text-left text-midnight-gray font-semibold text-sm">
                  Full Name
                </th>
                <th className="p-4 text-left text-midnight-gray font-semibold text-sm">
                  Email
                </th>
                <th className="p-4 text-left text-midnight-gray font-semibold text-sm">
                  Mobile Number
                </th>
                <th className="p-4 text-left text-midnight-gray font-semibold text-sm">
                  Status
                </th>
                <th className="p-4 text-left text-midnight-gray font-semibold text-sm">
                  Block Status
                </th>
                <th className="p-4 text-left text-midnight-gray font-semibold text-sm">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`border-b border-silver-fog ${
                    user.isBlocked === 1 ? "bg-[#fff5f5]" : "bg-white"
                  }`}
                >
                  <td className="p-4 text-midnight-gray text-sm">
                    {user.fullName}
                  </td>
                  <td className="p-4 text-oceanic-blue text-sm">
                    {user.email}
                  </td>
                  <td className="p-4 text-slate-mist text-sm">{user.mobile}</td>
                  <td className="p-4">
                    <StatusBadge isActive={user.isActive} />
                  </td>
                  <td className="p-4">
                    {user.isBlocked === 1 ? (
                      <span className="bg-blush-petal text-crimson-fire px-3 py-1 rounded-full text-xs font-semibold">
                        Blocked
                      </span>
                    ) : (
                      <span className="bg-mint-frost text-emerald-leaf px-3 py-1 rounded-full text-xs font-semibold">
                        Not Blocked
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditPopup(user)}
                        className="bg-emerald-leaf text-white px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => openBlockPopup(user)}
                        className={`${
                          user.isBlocked === 1
                            ? "bg-amber-flare"
                            : "bg-crimson-fire"
                        } text-white px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition-opacity`}
                      >
                        {user.isBlocked === 1 ? "Unblock" : "Block"}
                      </button>
                      <button
                        onClick={() => openDeletePopup(user)}
                        className="bg-slate-mist text-white px-3 py-1 rounded text-xs font-medium hover:opacity-90 transition-opacity"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Popup */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center transition-opacity ease-in-out duration-500 ${
          showAddPopup ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
      >
        <div
          className={`bg-white p-8 rounded-lg w-full max-w-md transition-all ease-in-out duration-500 ${
            showAddPopup
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-midnight-gray text-2xl font-bold mb-6">
            Add New User
          </h2>

          <div className="mb-4">
            <label className="block text-[charcoal-stone] text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={newUser.fullName}
              onChange={handleInputChange}
              className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[charcoal-stone] text-sm mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
            />
          </div>

          <div className="mb-4">
            <label className="block text-[charcoal-stone] text-sm mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              name="mobile"
              value={newUser.mobile}
              onChange={handleInputChange}
              className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
            />
          </div>

          <div className="mb-6">
            <label className="block text-[charcoal-stone] text-sm mb-2">
              Status
            </label>
            <select
              name="isActive"
              value={newUser.isActive}
              onChange={handleInputChange}
              className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
            >
              <option value="1">Active</option>
              <option value="0">Inactive</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => setShowAddPopup(false)}
              className="bg-slate-mist text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
            >
              Cancel
            </button>
            <button
              onClick={handleAddUser}
              className="bg-oceanic-blue text-white px-4 py-2 rounded hover:bg-royal-azure transition-colors"
            >
              Add User
            </button>
          </div>
        </div>
      </div>

      {/* Edit User Popup */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center transition-opacity ease-in-out duration-500 ${
          showEditPopup ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
      >
        <div
          className={`bg-white p-8 rounded-lg w-full max-w-md transition-all ease-in-out duration-500 ${
            showEditPopup
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-midnight-gray text-2xl font-bold mb-6">
            Edit User
          </h2>
          {currentUser && (
            <>
              <div className="mb-4">
                <label className="block text-[charcoal-stone] text-sm mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={currentUser.fullName}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[charcoal-stone] text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={currentUser.email}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[charcoal-stone] text-sm mb-2">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="mobile"
                  value={currentUser.mobile}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
                />
              </div>

              <div className="mb-4">
                <label className="block text-[charcoal-stone] text-sm mb-2">
                  Active Status
                </label>
                <select
                  name="isActive"
                  value={currentUser.isActive}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-[charcoal-stone] text-sm mb-2">
                  Block Status
                </label>
                <select
                  name="isBlocked"
                  value={currentUser.isBlocked}
                  onChange={handleEditInputChange}
                  className="w-full p-2 border border-silver-fog rounded focus:outline-none focus:ring-2 focus:ring-oceanic-blue"
                >
                  <option value="0">Not Blocked</option>
                  <option value="1">Blocked</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowEditPopup(false)}
                  className="bg-slate-mist text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEditUser}
                  className="bg-emerald-leaf text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Save Changes
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete User Popup */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center transition-opacity ease-in-out duration-500 ${
          showDeletePopup ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
      >
        <div
          className={`bg-white p-8 rounded-lg w-full max-w-md transition-all ease-in-out duration-500 ${
            showDeletePopup
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-midnight-gray text-2xl font-bold mb-4">
            Delete User
          </h2>
          {currentUser && (
            <>
              <p className="text-slate-mist mb-6">
                Are you sure you want to delete{" "}
                <span className="font-semibold text-midnight-gray">
                  {currentUser.fullName}
                </span>
                ? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowDeletePopup(false)}
                  className="bg-slate-mist text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="bg-crimson-fire text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Block/Unblock User Popup */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center transition-opacity ease-in-out duration-500 ${
          showBlockPopup ? "opacity-100 z-50" : "opacity-0 -z-50"
        }`}
      >
        <div
          className={`bg-white p-8 rounded-lg w-full max-w-md transition-all ease-in-out duration-500 ${
            showBlockPopup
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          {currentUser && (
            <>
              <h2 className="text-midnight-gray text-2xl font-bold mb-4">
                {currentUser.isBlocked === 1 ? "Unblock User" : "Block User"}
              </h2>
              <p className="text-slate-mist mb-6">
                Are you sure you want to{" "}
                {currentUser.isBlocked === 1 ? "unblock" : "block"}{" "}
                <span className="font-semibold text-midnight-gray">
                  {currentUser.fullName}
                </span>
                ?
                {currentUser.isBlocked === 0 &&
                  " This user will no longer be able to access the system."}
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowBlockPopup(false)}
                  className="bg-slate-mist text-white px-4 py-2 rounded hover:opacity-90 transition-opacity"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBlockToggle}
                  className={`${
                    currentUser.isBlocked === 1
                      ? "bg-amber-flare"
                      : "bg-crimson-fire"
                  } text-white px-4 py-2 rounded hover:opacity-90 transition-opacity`}
                >
                  {currentUser.isBlocked === 1 ? "Unblock" : "Block"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
