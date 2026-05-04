import React, { useEffect, useState } from "react";
const DataTable = ({ columns, records, pageSize = 6 }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(Math.ceil(records.length / pageSize), 1);
  const pageRows = records.slice((page - 1) * pageSize, page * pageSize);
  const hasRows = pageRows.length > 0;

  useEffect(() => {
    setPage(1);
  }, [records.length]);

  return <div className="data-table-wrapper">
  <div key="table" className="table-responsive">
    <table className="table align-middle smart-table">
      <thead key="thead">
        <tr>
          {columns.map((column) =>
                          <th key={column.key} scope="col">
            {column.label}
          </th>
                        )}
        </tr>
      </thead>
      <tbody key="tbody">
        {hasRows
                      ? pageRows.map((record, rowIndex) =>
                          <tr key={record._id || record.id || rowIndex}>
          {columns.map((column) =>
                                <td key={`${column.key}-${record._id || record.id || rowIndex}`}>
            {column.render ? column.render(record) : record[column.key]}
          </td>
                              )}
        </tr>
                        )
                      : [
                          <tr key="empty">
          <td className="empty-table-state" colSpan={columns.length}>No matching records found.</td>
        </tr>
                        ]}
      </tbody>
    </table>
  </div>
  <div key="pagination" className="table-pagination">
    <button key="prev" type="button" className="btn btn-light" onClick={() => setPage((currentPage) => Math.max(currentPage - 1, 1))} disabled={page === 1}>Previous</button>
    <span key="status" className="pagination-status">
      {`Page ${page} of ${pageCount}`}
    </span>
    <button key="next" type="button" className="btn btn-light" onClick={() =>
                  setPage((currentPage) => Math.min(currentPage + 1, pageCount))} disabled={page === pageCount}>Next</button>
  </div>
</div>;
};

export default DataTable;
