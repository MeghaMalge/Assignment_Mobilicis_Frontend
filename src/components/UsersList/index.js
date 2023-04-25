import React from "react";

import useWindowSize from "../../hooks/useWindowSize";
import LoadingSpinner from "../LoadingSpinner";
import Header from "../Header";
import UserItem from "../UserItem";

import "./UsersList.css";

export default function UsersList({ users, usersCase, isLoading }) {
  const [width] = useWindowSize();

  return (
    <div className="users">
      <Header className="heading2">
        {usersCase ? usersCase.description : "All users"}
      </Header>
      <div>
        <div className="user-header">
          <span className="user-field">Name</span>
          <span className="user-field">City</span>
          {width > 600 && (
            <>
              <span className="user-field">Gender</span>
              {width > 800 && (
                <>
                  <span className="user-field">Income</span>
                  <span className="user-field">Car</span>
                </>
              )}
            </>
          )}
        </div>

        {isLoading && (
          <div className="center">
            <LoadingSpinner overlay />
          </div>
        )}
        {!isLoading &&
          users &&
          users.map((user) => <UserItem key={user.id} user={user} />)}
      </div>
    </div>
  );
}
