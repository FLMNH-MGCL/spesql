import React, { useEffect, useState } from 'react';
import { AutoSizer, Column, Table, TableRowProps } from 'react-virtualized';
import axios from 'axios';
import useWindowDimensions from './utils/useWindowDimensions';
import { SortingConfig } from './VirtualizedTable';
import _ from 'lodash';
import useToggle from './utils/useToggle';
import Spinner from './ui/Spinner';
import Badge from './ui/Badge';
import CreateEditUserModal from './modals/CreateEditUserModal';
import CreateDeleteUserModal from './modals/CreateDeleteUserModal';
import CreateHelpModal from './modals/CreateHelpModal';
import CreateCreateUserModal from './modals/CreateCreateUserModal';
import CreateAdminLogModal from './modals/CreateAdminLogModal';

export type User = {
  id: number;
  name: string;
  username: string;
  role: string;
  created_at: any;
};

type TableRowRenderer = (
  props: TableRowProps & {
    onEditClick: React.Dispatch<React.SetStateAction<number | undefined>>;
    onDeleteClick: React.Dispatch<React.SetStateAction<number | undefined>>;
  }
) => React.ReactNode;

const rowRenderer: TableRowRenderer = ({
  className,
  columns,
  index,
  key,
  onRowClick,
  onRowDoubleClick,
  onRowMouseOut,
  onRowMouseOver,
  onRowRightClick,
  rowData,
  style,
  onEditClick,
  onDeleteClick,
}) => {
  const a11yProps = { 'aria-rowindex': index + 1 } as any;

  if (
    onRowClick ||
    onRowDoubleClick ||
    onRowMouseOut ||
    onRowMouseOver ||
    onRowRightClick
  ) {
    a11yProps['aria-label'] = 'row';
    a11yProps.tabIndex = 0;

    if (onRowClick) {
      a11yProps.onClick = (event: any) => onRowClick({ event, index, rowData });
    }
    if (onRowDoubleClick) {
      a11yProps.onDoubleClick = (event: any) =>
        onRowDoubleClick({ event, index, rowData });
    }
    if (onRowMouseOut) {
      a11yProps.onMouseOut = (event: any) =>
        onRowMouseOut({ event, index, rowData });
    }
    if (onRowMouseOver) {
      a11yProps.onMouseOver = (event: any) =>
        onRowMouseOver({ event, index, rowData });
    }
    if (onRowRightClick) {
      a11yProps.onContextMenu = (event: any) =>
        onRowRightClick({ event, index, rowData });
    }
  }

  return (
    <div
      {...a11yProps}
      className={className}
      key={key}
      role="row"
      style={style}
    >
      {columns.map((col: any, index) => {
        if (index === 5) {
          return (
            <div
              key={index}
              aria-colindex={7}
              className="ReactVirtualized__Table__rowColumn"
              role="gridcell"
              title=""
              style={{ overflow: 'hidden', flex: '1 1 330.6px' }}
            >
              <div className="flex justify-center space-x-2">
                <Badge onClick={() => onEditClick(rowData.id)}>Edit</Badge>
                <Badge color="red" onClick={() => onDeleteClick(rowData.id)}>
                  Delete
                </Badge>
              </div>
            </div>
          );
        } else {
          return col;
        }
      })}
    </div>
  );
};

export default function UsersTable() {
  const { width } = useWindowDimensions();
  const [users, setUsers] = useState<User[]>();
  const [sortingDirection, setSortingDirection] = useState<SortingConfig>();
  const [editing, setEditing] = useState<number>();
  const [deleting, setDeleting] = useState<number>();
  const [loading, { on, off }] = useToggle(false);

  let display = users
    ? sortingDirection
      ? _.orderBy(
          users,
          [sortingDirection.column],
          [sortingDirection.direction]
        )
      : users
    : [];

  // console.log(editing);
  async function getUsers() {
    on();
    const response = await axios
      .get('/api/admin/users')
      .catch((error) => error.response);

    if (response.status !== 200) {
      // notify
      off();
      return;
    }

    // TODO: use query from data?
    const { users } = response.data;
    setUsers(users.map((user: any) => user as User));
    off();
  }

  useEffect(() => {
    if (!users || !users.length) {
      getUsers();
    }
  }, []);

  function handleHeaderClick({ dataKey }: any) {
    if (!dataKey || dataKey === '') {
      return;
    }

    if (!sortingDirection) {
      setSortingDirection({
        column: dataKey,
        direction: 'asc',
      });
    } else if (sortingDirection && sortingDirection.column === dataKey) {
      if (sortingDirection.direction === 'asc') {
        setSortingDirection({
          ...sortingDirection,
          direction: 'desc',
        });
      } else {
        setSortingDirection(undefined);
      }
    } else {
      setSortingDirection({
        column: dataKey,
        direction: 'asc',
      });
    }
  }

  function renderHeader({ dataKey }: any) {
    let icon = null;

    if (sortingDirection && sortingDirection.column === dataKey) {
      if (sortingDirection.direction === 'asc') {
        icon = (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 15l7-7 7 7"
            />
          </svg>
        );
      } else {
        icon = (
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        );
      }
    }

    return (
      <div key={dataKey} className="flex space-x-2 items-center">
        <p>{dataKey}</p>
        {icon}
      </div>
    );
  }

  function getColumns() {
    const columns =
      !users || !users.length
        ? []
        : [
            ...Object.keys(users[0]).map((header) => {
              return (
                <Column
                  key={header}
                  label={header}
                  dataKey={header}
                  flexGrow={1}
                  flexShrink={1}
                  width={width / (Object.keys(users[0]).length + 1)}
                  headerRenderer={renderHeader}
                />
              );
            }),
            <Column
              key=""
              // label={header}
              dataKey=""
              flexGrow={1}
              flexShrink={1}
              width={width / (Object.keys(users[0]).length + 1)}
              headerRenderer={renderHeader}
            />,
          ];

    return columns;
  }

  return (
    <React.Fragment>
      {editing && users && (
        <CreateEditUserModal
          open={editing !== undefined}
          user={users.find((user) => user.id === editing)!}
          onClose={() => setEditing(undefined)}
        />
      )}

      {deleting && users && (
        <CreateDeleteUserModal
          open={deleting !== undefined}
          user={users.find((user) => user.id === deleting)!}
          onClose={() => {
            setDeleting(undefined);
          }}
          refreshUsers={() => getUsers()}
        />
      )}

      <div className="w-full align-middle overflow-x-auto overflow-hidden table-height">
        <Spinner active={loading} />
        <AutoSizer>
          {({ height, width }) => (
            <Table
              height={height}
              width={width}
              rowHeight={40}
              headerHeight={60}
              rowCount={display.length}
              rowGetter={({ index }) => display[index]}
              onHeaderClick={handleHeaderClick}
              headerClassName="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-600  tracking-wider cursor-pointer focus:outline-none"
              gridClassName="whitespace-no-wrap text-sm leading-5 font-medium text-gray-900"
              rowRenderer={(props) =>
                rowRenderer({
                  ...props,
                  onEditClick: setEditing,
                  onDeleteClick: setDeleting,
                })
              }
            >
              {getColumns()}
            </Table>
          )}
        </AutoSizer>
      </div>
      <nav className="bg-gray-50 px-4 py-3 flex items-center justify-between sm:px-6 border-t border-cool-gray-100">
        <div className="flex space-x-2 items-center">
          <CreateCreateUserModal refresh={getUsers} />
        </div>
        <div className="flex space-x-2 items-center">
          {/* TODO: create ADMIN log modal */}
          <CreateAdminLogModal />
          <CreateHelpModal variant="admin-user" />
        </div>
      </nav>
    </React.Fragment>
  );
}
