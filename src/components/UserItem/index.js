import React, { useState } from "react";

import useWindowSize from "../../hooks/useWindowSize";
import Modal from "../Modal";
import UserCard from "../UserCard";

import "./UserItem.css";

export default function UserItem({ user }) {
  const [width] = useWindowSize();
  const [show, setShow] = useState(false);

  const openModalHandler = () => {
    setShow(true);
  };

  const closeModalHandler = () => {
    setShow(false);
  };
  return (
    <>
      <Modal
        show={show}
        onCancel={closeModalHandler}
        header={`${user.first_name} ${user.last_name}`}
        contentClass=""
      >
        <UserCard user={user} />
      </Modal>
      <div className="user" onClick={openModalHandler}>
        <span className="user-field">{`${user.first_name} ${user.last_name}`}</span>
        <span className="user-field">{user.city}</span>
        {width > 600 && (
          <>
            <span className="user-field">{user.gender}</span>
            {width > 800 && (
              <>
                <span className="user-field">{user.income}</span>
                <span className="user-field">{user.car}</span>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
