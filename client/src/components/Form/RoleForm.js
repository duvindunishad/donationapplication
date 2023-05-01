import React from "react";

const RoleForm = ({ handleSubmit, newRole, setNewRole }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newRole">Select new role:</label>
        <select
          id="role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="">Select a role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit">Update role</button>
      </form>
    </>
  );
};

export default RoleForm;
