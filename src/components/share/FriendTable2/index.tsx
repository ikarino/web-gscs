import React, { useState } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult
} from "react-beautiful-dnd";

import { SCSFriendInput } from "torneko3js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    quoteItem: {
      width: "200px",
      border: "1px solid grey",
      marginBottom: "8px",
      backgroundColor: "lightblue",
      padding: "8px"
    }
  })
);

type TypeQuote = {
  id: string;
  content: string;
};

const initial = Array.from({ length: 10 }, (v, k) => k).map(k => {
  const custom: TypeQuote = {
    id: `id-${k}`,
    content: `Quote ${k}`
  };

  return custom;
});

const reorder = (list: TypeQuote[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function Quote({ quote, index }: { quote: TypeQuote; index: number }) {
  const classes = useStyles();
  return (
    <Draggable draggableId={quote.id} index={index}>
      {provided => (
        <div
          className={classes.quoteItem}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {quote.content}
        </div>
      )}
    </Draggable>
  );
}

type Props = {
  friends: SCSFriendInput[];
  editable: boolean;
};

export default function FriendTable({ friends, editable }: Props) {
  const [state, setState] = useState({ quotes: initial });

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const quotes = reorder(
      state.quotes,
      result.source.index,
      result.destination.index
    );

    setState({ quotes });
  }

  const list = state.quotes.map((quote: TypeQuote, index: number) => (
    <Quote quote={quote} index={index} key={quote.id} />
  ));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {list}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
