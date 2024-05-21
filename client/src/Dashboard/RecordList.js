import React, { useMemo } from 'react';
import { useTable, Column, CellProps, Row } from 'react-table';
import { useFinancialRecords } from '../Context/recordContext';


const RecordList = () => {
  const { record } = useFinancialRecords();

  const columns = useMemo(()=>[
    {
      Header: "Description",
      accessor: "description",
    }
  ], []);

  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = useTable(columns, record);
  return (
    <div>
      <table {...getTableProps()}>
        <thead {...headerGroups.map((hg)=>(
          <tr {...hg.getHeaderGroupProps()}>
            {hg.headers.map((column)=>(
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}>
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, idx)=>{
            prepareRow(row);
            return <tr {...row.getRowProps()}>{row.cells.map((cell)=>(
              <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
            ))}</tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default RecordList
