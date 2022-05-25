import React, { FC, useCallback, useState } from 'react'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k}`,
    content: `item ${k}`,
  }));

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? '#17382d' : 'transparent',
  color: isDragging ? '#ffffff' : '#000000',
  border: '2px solid #ffffff',

  // styles we need to apply on draggables
  ...draggableStyle,
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? '#255b49' : '#347f66',
  padding: grid,
  width: 250,
});

export function DndExample() {
  const [items, setItems] = useState<any[]>(getItems(10))


  const onDragEnd = (result: any) =>  {
    if (!result.destination) {
      return;
    }

    const _items = reorder(
      items,
      result.source.index,
      result.destination.index,
    );

    setItems(_items);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided, droppableSnapshot) => (
            <div
              ref={droppableProvided.innerRef}
              style={getListStyle(droppableSnapshot.isDraggingOver)}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <div
                      className='draggable-item'
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      style={getItemStyle(
                        draggableSnapshot.isDragging,
                        draggableProvided.draggableProps.style,
                      )}
                    >
                      {item.content}
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M88 352C110.1 352 128 369.9 128 392V440C128 462.1 110.1 480 88 480H40C17.91 480 0 462.1 0 440V392C0 369.9 17.91 352 40 352H88zM280 352C302.1 352 320 369.9 320 392V440C320 462.1 302.1 480 280 480H232C209.9 480 192 462.1 192 440V392C192 369.9 209.9 352 232 352H280zM40 320C17.91 320 0 302.1 0 280V232C0 209.9 17.91 192 40 192H88C110.1 192 128 209.9 128 232V280C128 302.1 110.1 320 88 320H40zM280 192C302.1 192 320 209.9 320 232V280C320 302.1 302.1 320 280 320H232C209.9 320 192 302.1 192 280V232C192 209.9 209.9 192 232 192H280zM40 160C17.91 160 0 142.1 0 120V72C0 49.91 17.91 32 40 32H88C110.1 32 128 49.91 128 72V120C128 142.1 110.1 160 88 160H40zM280 32C302.1 32 320 49.91 320 72V120C320 142.1 302.1 160 280 160H232C209.9 160 192 142.1 192 120V72C192 49.91 209.9 32 232 32H280z"/></svg>
                    </div>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
  )
}
