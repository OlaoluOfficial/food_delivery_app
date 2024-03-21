import React, { useMemo } from "react";
import { useTable } from "react-table";
import { FaTrash, FaXmark } from "react-icons/fa6";
import image from "../deliveryMan.png";

const UserTable = ({ userData, onDelete, setSelectedId }) => {
  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "avatar",
        Cell: () => (
          <img
            src={image}
            alt="Avatar"
            style={{ width: "50px", borderRadius: "50%" }}
          />
        ),
      },
      {
        Header: "Name",
        accessor: "username",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Phone Number",
        accessor: "phone",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <button
            onClick={() => {
              onDelete(row.original._id);
            }}
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <FaTrash
              className="click-order3-icon"
              style={{ width: "20px", height: "20px" }}
            ></FaTrash>
          </button>
        ),
      },
    ],
    [onDelete]
  );

  const data = useMemo(() => userData, [userData]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <div style={{ overflowX: "auto", width: "100%" }}>
      <table
        {...getTableProps()}
        style={{ borderCollapse: "collapse", width: "100%" }}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "2px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                style={{
                  borderBottom: "1px solid #ddd",
                  backgroundColor: "white",
                  textAlign: "center",
                }}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: "8px",
                      textAlign: "center",
                    }}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
