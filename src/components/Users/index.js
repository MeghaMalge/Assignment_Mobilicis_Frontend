import React, { useEffect, useState } from "react";

import { useHttpClient } from "../../hooks/http-hook";
import { usersFilters } from "../../constants";
import Header from "../Header";
import UsersList from "../UsersList";
import ErrorModal from "../ErrorModal";

import "./Users.css";

export default function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [users, setUsers] = useState();
  const [usersCase, setUsersCase] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await sendRequest(
        usersCase
          ? `${process.env.REACT_APP_BACKEND_URL}/users/${usersCase.name}`
          : `${process.env.REACT_APP_BACKEND_URL}/users`
      );

      if (!error) {
        setUsers(data);
      }
    };

    fetchUsers();
  }, [error, sendRequest, usersCase]);

  return (
    <div>
      <ErrorModal error={error} onClear={clearError} />
      <Header className="heading1">Our Users</Header>
      <div className="users-filters">
        <span>Filter users</span>
        {usersFilters.map((filter) => {
          return (
            <button
              className="btn-text"
              onClick={() => {
                setUsersCase(filter);
              }}
            >
              {filter.description}
            </button>
          );
        })}
      </div>
      <UsersList users={users} usersCase={usersCase} isLoading={isLoading} />
    </div>
  );
}
