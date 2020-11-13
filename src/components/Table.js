import React, { useMemo } from 'react';
import { useTable } from 'react-table';

const Table = ({
  columns,
  data,
  className,
  columnClassName,
  rowClassName,
  cellClassName,
  headerClassName,
}) => {
  const memoizedData = useMemo(() => data, [data]);
  const memoizedColumns = useMemo(() => columns, [columns]);

  const {
    rows,
    headerGroups,
    prepareRow,
    getTableProps,
    getTableBodyProps,
  } = useTable({
    columns: memoizedColumns,
    data: memoizedData,
  });

  return (
    <table className={className} {...getTableProps()}>
      <thead className="rounded-t-md">
        {headerGroups.map((headerGroup) => (
          <tr
            key={headerGroup}
            {...headerGroup.getHeaderGroupProps([
              { className: headerClassName },
            ])}
          >
            {headerGroup.headers.map((column) => (
              <th
                key={column}
                {...column.getHeaderProps([
                  {
                    className: columnClassName,
                  },
                ])}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr key={row} className={rowClassName} {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  key={cell}
                  {...cell.getCellProps([{ className: cellClassName }])}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
