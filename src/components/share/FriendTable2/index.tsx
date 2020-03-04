import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";

import { RootState } from "../../../store";

import { FriendType } from "./types";
import FriendList from "./FriendList";

const reorder = (
  list: FriendType[],
  startIndex: number,
  endIndex: number
): FriendType[] => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const FriendTable = () => {
  const fs = useSelector((store: RootState) => store.scsInput.inp.friends);
  const initial = fs.map(
    (f, i): FriendType => ({
      id: i.toString(),
      content: f
    })
  );

  const [state, setState] = useState({ items: initial });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const items = reorder(
      state.items,
      result.source.index,
      result.destination.index
    );

    setState({ items });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <FriendList friends={state.items} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default FriendTable;
