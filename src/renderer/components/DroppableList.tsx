import React from 'react';
import {
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import { Badge, Heading } from '@flmnh-mgcl/ui';

type DroppableListProps = {
  heading: string;
  items: string[];
};

export default function DroppableList({
  heading,
  snapshot,
  provided,
  items,
}: {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
} & DroppableListProps) {
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver
      ? '#68d391'
      : localStorage.theme === 'dark'
      ? 'rgb(50,50,50)'
      : '#f9fafb',
    width: 250,
  });

  return (
    <div>
      <Heading className="mb-2">{heading}</Heading>
      <div
        {...provided.droppableProps}
        ref={provided.innerRef}
        style={getListStyle(snapshot.isDraggingOver)}
        className="rounded-md max-h-72 overflow-y-auto p-2"
      >
        {items.map((item, index: number) => (
          <React.Fragment key={`${item}-${index}`}>
            <Draggable draggableId={item} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  className="my-2"
                  key={`${item}-${index}-inner`}
                >
                  <Badge
                    label={item}
                    truncate
                    key={`${item}-${index}-banner`}
                  />
                </div>
              )}
            </Draggable>
          </React.Fragment>
        ))}
        {provided.placeholder}
      </div>
    </div>
  );
}
