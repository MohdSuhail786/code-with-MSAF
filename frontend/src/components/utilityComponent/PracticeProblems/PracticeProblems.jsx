import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Chip } from "@mui/material";
import useFetch from "../customHooks/useFetch";
import { isUserLoggedIn } from "../../../utils";

const columns = [
  { id: "s.no", label: "#", minWidth: 100 },
  { id: "problemCode", label: "Problem Code", minWidth: 100 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "level",
    label: "Difficulty",
    minWidth: 170,
    align: "center",
  },
  {
    id: "point",
    label: "Points",
    minWidth: 170,
    align: "center",
  },
  {
    id: "submission",
    label: "Submission",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "accuracy",
    label: "Accuracy",
    minWidth: 170,
    align: "center",
    format: (value) => value.toLocaleString("en-US") + " %",
  },
];

const useColumns = {
  true: [...columns,{
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "center",
    format: (value) => value.toFixed(2),
  },],
  false: columns
}

const rows = [
  {
    name: "Largest element in array",
    code: "ARR01",
    submission: "400",
    accuracy: "63.0",
    status: true,
  },
  {
    name: "Complete the credits",
    code: "CREDITS",
    submission: "450",
    accuracy: "69.0",
    status: true,
  },
  {
    name: "Winning Strategy",
    code: "TOWIN",
    submission: "500",
    accuracy: "73.0",
    status: false,
  },
  {
    name: "Lazy Salesman",
    code: "HOLIDAYS",
    submission: "400",
    accuracy: "63.0",
    status: true,
  },
  {
    name: "Complete the credits",
    code: "CREDITS",
    submission: "450",
    accuracy: "69.0",
    status: true,
  },
  {
    name: "Winning Strategy",
    code: "TOWIN",
    submission: "500",
    accuracy: "73.0",
    status: false,
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const {data,waiting,error} = useFetch(`/top/questions`,"GET")
  console.log(data?.question)
  return (
    <>
    <head>
    <meta name="viewport" content="width=1000, initial-scale=1" />
    </head>
    <div className=" m-header-one jumbotron-fluid mt-5 py-3">
      <div className="d-block practice-container l-header h-auto mx-auto justify-content-between align-items-center">
      <div>
      <div className="l-row--680">
        <h2 className="m-head__2">Problems</h2>
      </div>
      
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {useColumns[isUserLoggedIn() ? 'true':'false'].map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {!waiting && data?.question.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, i) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {useColumns[isUserLoggedIn() ? 'true':'false'].map((column) => {
                        const value =
                          column.id == "s.no" ? i + 1 : row[column.id];
                        if (column.id == "status") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value ? (
                                <Chip
                                  style={{ color: "white", fontSize: 12 }}
                                  color="success"
                                  label={"Solved"}
                                />
                              ) : (
                                <Chip
                                  label="Unsolved"
                                  color="error"
                                  variant="outlined"
                                />
                              )}
                            </TableCell>
                          );
                        }
                        if (column.id == "name") {
                          return (
                            <TableCell
                              key={column.id}
                              sx={{ color: "#2a67b1" }}
                              align={column.align}
                            >
                              <a style={{color:'#0d6efd'}} href={`/problem/${row.problemCode}`}>{value}</a>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={data?.question?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </div>
      </div>
    </div>
    </>
  );
}
