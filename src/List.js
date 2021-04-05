import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, editItem } from "./features/ItemSlice";
import styled from "styled-components";

function List({ text, id, setOn, setShow }) {
  const [isChecked, setChecked] = useState(false);
  const [isEnable, setEnable] = useState(false);
  const [inputText, setInput] = useState("");
  const array = useSelector((state) => state.items.item);
  const dispatch = useDispatch();

  const handleDeleteList = async () => {
    const index = await array.findIndex((i) => i.id === id);
    console.log(index);
    if (index !== -1) {
      dispatch(deleteItem(index));
    }
    setOn(false);
    setShow(false);
  };

  const setEdits = (e) => {
    if (e.key === "Enter") {
      setEnable(false);
      const index = array.findIndex((i) => i.id === id);
      if (index !== -1) {
        dispatch(editItem({ index: index, inputText: inputText }));
      }
    }
  };

  const handleEdits = () => {
    setEnable(!isEnable);
  };

  const onChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <ItemBody>
      <div className="left">
        <input
          type="checkbox"
          defaultChecked={isChecked}
          onChange={() => setChecked(!isChecked)}
        />
        {!isEnable ? (
          <p
            className="list_text"
            style={isChecked ? { textDecoration: "line-through" } : {}}
          >
            {text}
          </p>
        ) : (
          <div>
            <input
              type="text"
              value={inputText}
              onChange={onChange}
              onKeyPress={setEdits}
            />
            <button className="cancelButton" onClick={() => setEnable(false)}>
              cancel
            </button>
          </div>
        )}
      </div>
      <div className="right">
        <IconButton onClick={handleDeleteList}>
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={handleEdits}>
          <EditIcon />
        </IconButton>
      </div>
    </ItemBody>
  );
}

export default List;

const ItemBody = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  min-width: 200px;
  max-width: 700px;
  border-bottom: 1px solid white;

  .left {
    display: flex;
    align-items: center;

    .list_text {
      min-width: 400px;
    }

    input {
      margin-right: 15px;
    }
  }
  .right {
    display: flex;
  }

  .MuiIconButton-root {
    color: white;
  }
`;
