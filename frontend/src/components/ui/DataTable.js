import React, { useEffect, useState } from "react";
import { h } from "../../utils/h";

const DataTable = ({ columns, records, pageSize = 6 }) => {
  const [page, setPage] = useState(1);
  const pageCount = Math.max(Math.ceil(records.length / pageSize), 1);
  const pageRows = records.slice((page - 1) * pageSize, page * pageSize);
  const hasRows = pageRows.length > 0;

  useEffect(() => {
    setPage(1);
  }, [records.length]);

  return h("div", { className: "data-table-wrapper" }, [
    h(
      "div",
      {
        key: "table",
        className: "table-responsive"
      },
      h(
        "table",
        {
          className: "table align-middle smart-table"
        },
        [
          h(
            "thead",
            { key: "thead" },
            h(
              "tr",
              null,
              columns.map((column) =>
                h("th", { key: column.key, scope: "col" }, column.label)
              )
            )
          ),
          h(
            "tbody",
            { key: "tbody" },
            hasRows
              ? pageRows.map((record, rowIndex) =>
                  h(
                    "tr",
                    { key: record._id || record.id || rowIndex },
                    columns.map((column) =>
                      h(
                        "td",
                        { key: `${column.key}-${record._id || record.id || rowIndex}` },
                        column.render ? column.render(record) : record[column.key]
                      )
                    )
                  )
                )
              : [
                  h(
                    "tr",
                    { key: "empty" },
                    h(
                      "td",
                      {
                        className: "empty-table-state",
                        colSpan: columns.length
                      },
                      "No matching records found."
                    )
                  )
                ]
          )
        ]
      )
    ),
    h(
      "div",
      {
        key: "pagination",
        className: "table-pagination"
      },
      [
        h(
          "button",
          {
            key: "prev",
            type: "button",
            className: "btn btn-light",
            onClick: () => setPage((currentPage) => Math.max(currentPage - 1, 1)),
            disabled: page === 1
          },
          "Previous"
        ),
        h(
          "span",
          {
            key: "status",
            className: "pagination-status"
          },
          `Page ${page} of ${pageCount}`
        ),
        h(
          "button",
          {
            key: "next",
            type: "button",
            className: "btn btn-light",
            onClick: () =>
              setPage((currentPage) => Math.min(currentPage + 1, pageCount)),
            disabled: page === pageCount
          },
          "Next"
        )
      ]
    )
  ]);
};

export default DataTable;
