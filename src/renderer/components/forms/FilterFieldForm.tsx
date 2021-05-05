import { isArray } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DropResult,
  DraggableLocation,
} from 'react-beautiful-dnd';
import shallow from 'zustand/shallow';
import { useStore } from '../../../stores';
import DroppableList from '../DroppableList';
import { headerOptions } from '../utils/constants';

export default function FilterFieldForm() {
  const { filterByFields, setFilterByFields } = useStore(
    (state) => ({
      filterByFields: state.queryData.filterByFields,
      setFilterByFields: state.queryData.setFilterByFields,
    }),
    shallow
  );

  const [filters, setAvailableFilters] = useState<string[]>(getFilters());

  function getFilters() {
    if (filterByFields === 'all') {
      return headerOptions;
    } else {
      return headerOptions.filter(
        (header) => !filterByFields.includes(header as any)
      );
    }
  }

  useEffect(() => {
    setAvailableFilters(getFilters());
  }, [filterByFields]);

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

  function reorder(list: string[], source: number, destination: number) {
    const result = Array.from(list);
    const [removed] = result.splice(source, 1);
    result.splice(destination, 0, removed);

    return result;
  }

  function fieldsAsArray() {
    if (isArray(filterByFields)) {
      return filterByFields;
    } else {
      return [];
    }
  }

  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        source.droppableId === 'selectedHeaders' ? fieldsAsArray() : filters,
        source.index,
        destination.index
      );

      if (source.droppableId === 'selectedHeaders') {
        setFilterByFields(items as any);
      }
    } else {
      const result = move(
        source.droppableId === 'selectedHeaders' ? fieldsAsArray() : filters,
        destination.droppableId === 'selectedHeaders'
          ? fieldsAsArray()
          : filters,
        source,
        destination
      );

      setFilterByFields(result.selectedHeaders);
    }
  }

  return (
    <div className="flex justify-between">
      {/* selected items */}
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="selectedHeaders">
          {(provided, snapshot) => (
            <DroppableList
              heading="Selected"
              snapshot={snapshot}
              provided={provided}
              items={fieldsAsArray()}
            />
          )}
        </Droppable>

        {/* available items */}
        <Droppable droppableId="availableHeaders">
          {(provided, snapshot) => (
            <DroppableList
              heading="Available"
              snapshot={snapshot}
              provided={provided}
              items={filters}
            />
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
