import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DropResult,
  DraggableLocation,
  DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import Badge from '../ui/Badge';
import Heading from '../ui/Heading';
import { headerOptions } from '../utils/constants';
import { useNotify } from '../utils/context';

// FIXME: figure out droppable warnings!!
// ex: Invariant failed: Draggable[id: recordEnteredBy]: Unable to find drag handle
// they are not breaking functionality, but I want to figure out the cause

type DroppableListProps = {
  heading: string;
  items: string[];
};

function DroppableList({
  heading,
  snapshot,
  provided,
  items,
}: {
  provided: DroppableProvided;
  snapshot: DroppableStateSnapshot;
} & DroppableListProps) {
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? '#68d391' : '#f9fafb',
    width: 250,
  });

  return (
    <div>
      <Heading>{heading}</Heading>
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

export default function HeaderConfigurationForm() {
  const { tableConfig, updateTableHeaders } = useStore(
    (state) => ({
      tableConfig: state.tableConfig,
      updateTableHeaders: state.tableConfig.updateTableHeaders,
    }),
    shallow
  );

  const { notify } = useNotify();

  const [availableHeaders, setAvailableHeaders] = useState(
    headerOptions.filter((header) => !tableConfig.headers.includes(header))
  );

  function reorder(list: string[], source: number, destination: number) {
    const result = Array.from(list);
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);

    return result;
  }

  /**
   * Moves an item from one list to another list.
   */
  function move(
    source: string[],
    destination: string[],
    droppableSource: DraggableLocation,
    droppableDestination: DraggableLocation
  ) {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result: any = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      console.log('moving WITHIN lists...');

      const items = reorder(
        source.droppableId === 'selectedHeaders'
          ? tableConfig.headers
          : availableHeaders,
        source.index,
        destination.index
      );

      console.log(items);

      if (source.droppableId === 'selectedHeaders') {
        updateTableHeaders(items);
      } else {
        setAvailableHeaders(items);
      }
    } else {
      console.log('moving ACROSS lists...');
      const result = move(
        source.droppableId === 'selectedHeaders'
          ? tableConfig.headers
          : availableHeaders,
        destination.droppableId === 'selectedHeaders'
          ? tableConfig.headers
          : availableHeaders,
        source,
        destination
      );

      if (result.selectedHeaders.length > 8) {
        notify({
          title: 'Usage Error',
          message: 'You may only select 8 headers for the table',
          level: 'error',
        });
      } else {
        updateTableHeaders(result.selectedHeaders);
        setAvailableHeaders(result.availableHeaders);
      }

      // console.log('selected items update:', result.selectedHeaders);
      // console.log('available items update:', result.availableHeaders);
    }
  }

  return (
    <div className="flex justify-between">
      {/* active items */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="selectedHeaders">
          {(provided, snapshot) => (
            <DroppableList
              heading="Selected"
              snapshot={snapshot}
              provided={provided}
              items={tableConfig.headers}
            />
          )}
        </Droppable>

        <Droppable droppableId="availableHeaders">
          {(provided, snapshot) => (
            <DroppableList
              heading="Available"
              snapshot={snapshot}
              provided={provided}
              items={availableHeaders}
            />
          )}
        </Droppable>
      </DragDropContext>

      {/* available items */}
    </div>
  );
}
