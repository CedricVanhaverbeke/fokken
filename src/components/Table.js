import React, { useMemo } from 'react';
import { useTable } from 'react-table';

const Table = ({
  columns,
  data,
  className,
  columnClassName,
  cellClassName,
  headerClassName,
}) => {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: memoizedColumns,
    data: memoizedData,
  });

  return (
    <table className={className} {...getTableProps()}>
      <thead className="rounded-t-md">
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps([
              { className: headerClassName },
            ])}
          >
            {headerGroup.headers.map((column) => (
              <th
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
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps([{ className: cellClassName }])}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
