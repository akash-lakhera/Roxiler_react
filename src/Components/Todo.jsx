import { Box, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { AccountCircle } from "@mui/icons-material";
import { useEffect, useState } from "react";
import Users from "./Users";
import {
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
} from "@mui/material";
function Todo() {
  const [todos, setTodos] = useState({});
  const [desc, setDesc] = useState(false);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState({});
  const columns = [
    { id: "todoId", label: "Todo Id" },

    {
      id: "title",
      label: "Title",
      align: "right",
    },
    {
      id: "status",
      label: "Status",
      align: "right",
    },
    {
      id: "toUser",
      label: "View User",
      align: "right",
    },
  ];
  let debounce;
  const filter = (e) => {
    setSearch(e.target.value);
  };

  let a = [];
  if (Object.keys(todos).length) a = ["id", "title", "completed", "toUser"];
  let b = ["id", "title", "completed"];
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => {
        setTodos(data);
      });

    return () => {};
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        paddingTop: "10vh",
        gap: "40px",
        alignItems: "end",
        paddingInline: "10px",
      }}
    >
      <Box sx={{ flex: "1 1 0" }}>
        <Box
          sx={{
            display: "flex",
            backgroundColor: "white",
            justifyContent: "space-between",
            paddingInline: "10px",
            alignItems: "center",
          }}
        >
          Todos
          <Box
            sx={{
              borderRadius: "30px",
              width: "fitContent",
              padding: "2px",
              border: "solid 1px ",
            }}
          >
            <TextField
              onChange={filter}
              sx={{ border: "none", borderImage: "none" }}
              id="input-with-icon-textfield"
              variant="standard"
              value={search}
              placeholder="Search"
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Box>

        <TableContainer
          sx={{
            border: "solid 2px",
            maxHeight: "60vh",
            minHeight: "60vh",
            marginTop: "10px",
            color: "rgb(0, 30, 60)",
          }}
        >
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow key={"header"}>
                {columns.map((column) => {
                  if (column.id == "todoId")
                    return (
                      <TableCell
                        onClick={() => {
                          setDesc(!desc);
                          setTodos([...todos].reverse());
                        }}
                        sx={{
                          backgroundColor: "rgb(0, 30, 60)",
                          color: "white",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                        key={column.id}
                        style={{
                          whiteSpace: "noWrap",
                          textAlign: "center",
                          position: "relative",
                        }}
                      >
                        <ArrowDownwardIcon
                          sx={{
                            rotate: desc ? "0deg" : "-180deg",
                            fontSize: "24px",
                            position: "absolute",
                            top: "17px",
                            right: "-5px",
                            transition: "all 0.2s ease",
                          }}
                        />
                        {column.label}
                      </TableCell>
                    );
                  else
                    return (
                      <TableCell
                        sx={{
                          backgroundColor: "rgb(0, 30, 60)",
                          color: "white",
                          alignItems: "center",
                        }}
                        key={column.id}
                        style={{
                          whiteSpace: "noWrap",
                          textAlign: "center",
                          position: "relative",
                        }}
                      >
                        {column.label}
                      </TableCell>
                    );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {a.length ? (
                todos
                  .filter((elem) => {
                    if (!search) {
                      return true;
                    } else {
                      let filt = false;
                      b.forEach((col) => {
                        if (new String(elem[col]).indexOf(search) != -1)
                          filt = true;
                      });
                      return filt;
                    }
                  })
                  .map((row) => {
                    {
                    }
                    return (
                      <TableRow
                        sx={{
                          backgroundColor:
                            row.id === user.todoId ? "rgb(199, 220, 241)" : "",
                        }}
                        key={row.id}
                      >
                        {a.map((col, index) => {
                          if (index == 3)
                            return (
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  color: "inherit",
                                }}
                                key={col}
                              >
                                {
                                  <Button
                                    onClick={() => {
                                      setUser({
                                        todoId: row.id,
                                        todo: row.title,
                                        user: row.userId,
                                      });
                                    }}
                                    sx={{
                                      whiteSpace: "nowrap",
                                      backgroundColor: "white",
                                    }}
                                    variant="outlined"
                                  >
                                    Show User
                                  </Button>
                                }
                              </TableCell>
                            );
                          else
                            return (
                              <TableCell
                                style={{
                                  textAlign: "center",
                                  color: "inherit",
                                }}
                                key={col}
                              >
                                {new String(row[col])}
                              </TableCell>
                            );
                        })}
                      </TableRow>
                    );
                  })
              ) : (
                <TableRow></TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Users user={user}></Users>
    </Box>
  );
}
export default Todo;
