import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteAllItems, clearAndAdd } from "./features/ItemSlice";
import db, { auth } from "./Firebase";
import List from "./List";
import styled from "styled-components";
import { logout } from "./features/userSlice";

function HomeScreen() {
  const arr = useSelector((state) => state.items.item);
  const dispatch = useDispatch();
  const [inputVal, setInput] = useState("");
  const user = useSelector((state) => state.users.user);
  const [on, setOn] = useState(false);
  const [show, setShow] = useState(false);
  const [userExist, setUserExist] = useState(true);

  const handleClick = () => {
    if (inputVal.trim()) {
      dispatch(
        addItem({
          id: arr.length + 1,
          inputText: inputVal,
        })
      );

      setInput("");
      setOn(false);
      setShow(false);
    } else {
      alert("Enter Input Field");
    }
  };

  const setData = () => {
    db.ref(`/userID: ${user.userID}/items`).set(arr);
    setOn(!on);
    setShow(true);
  };

  const loadPreviousLog = () => {
    db.ref(`/userID: ${user.userID}/items`).on("value", async (data) => {
      const retrieved = await data.val();
      console.log(retrieved);
      dispatch(clearAndAdd(retrieved));
      setShow(true);
    });
  };
  const shut = true;
  useEffect(() => {
    db.ref(`/userID: ${user.userID}`).on("value", async (data) => {
      const response = await data.val();
      if (response) setUserExist(false);
    });
  }, [shut]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const signOut = () => {
    auth.signOut();
    dispatch(logout());
  };

  const deleteAll = () => {
    dispatch(deleteAllItems());
    setShow(false);
  };

  return (
    <HomeScreenBody>
      <div className="bodyContainer">
        <h1>TODO LIST</h1>
        <input
          type="text"
          placeholder="What needs to be done?"
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          value={inputVal}
        />
        <button onClick={handleClick}>Add</button>
      </div>
      <div id="scrollDiv" className="lists">
        {arr?.length ? (
          arr.map(({ id, inputText }) => {
            const keyId = Math.random().toString(36).slice(-5);
            return (
              <List
                on={on}
                setOn={setOn}
                setShow={setShow}
                key={keyId}
                id={id}
                text={inputText}
              />
            );
          })
        ) : (
          <p>What needs to be done?</p>
        )}
        <div className="fixed">
          <div class="tooltip">
            <img src={user.photoUrl} onClick={signOut} alt="broken image" />
            <div class="top">
              <p>Logout</p>
            </div>
          </div>

          <button
            disabled={arr?.length <= 0 ? true : false}
            onClick={deleteAll}
          >
            Delete All
          </button>

          <button disabled={show || userExist} onClick={loadPreviousLog}>
            Load last saved
          </button>
          <button
            disabled={show || arr?.length <= 0 ? true : false}
            onClick={setData}
          >
            Save
          </button>
        </div>
      </div>
    </HomeScreenBody>
  );
}

export default HomeScreen;

const HomeScreenBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  #scrollDiv {
    width: 70%;
    height: 80%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }

  .fixed {
    position: fixed;
    right: 2%;
    top: 10%;
    width: 5rem;

    button {
      border: none;
      outline: none;
      padding: 0.25rem;
      color: white;
      background-color: black;

      &:disabled {
        opacity: 0.25;
        transform: scale(0.95);
      }

      &:not(:first-child) {
        margin-top: 1rem;
      }
    }

    img {
      width: 5rem;
      height: 5rem;
      border-radius: 10rem;
      cursor: pointer;
    }

    .tooltip {
      display: inline-block;
      position: relative;
      border-bottom: 1px dotted #666;
      text-align: left;
    }

    .tooltip h3 {
      margin: 12px 0;
    }

    .tooltip .top {
      /* min-width: 200px;
      max-width: 400px; */
      top: -20px;
      /* left: 0.125rem; */
      right: 5%;
      transform: translate(-30%, -100%);
      padding: 10px 20px;
      color: black;
      background-color: gray;
      font-weight: normal;
      font-size: 14px;
      border-radius: 8px;
      position: absolute;
      z-index: 1;
      box-sizing: border-box;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
      display: none;
    }

    .tooltip:hover .top {
      display: block;
    }

    .tooltip .top i {
      position: absolute;
      top: 100%;
      left: 30%;
      margin-left: -15px;
      width: 30px;
      height: 15px;
      overflow: hidden;
    }

    .tooltip .top i::after {
      content: "";
      position: absolute;
      width: 15px;
      height: 15px;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      background-color: #009cdc;
      box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
    }
  }
`;
