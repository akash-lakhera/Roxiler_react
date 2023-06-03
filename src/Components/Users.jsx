import { Box } from "@mui/material";
import { useEffect, useState } from "react";

function Users(props) {
  const [userData, setUserData] = useState("");
 
  useEffect(() => {
    if (Object.keys(props.user).length) {
      fetch("https://jsonplaceholder.typicode.com/users/" + props.user.user)
        .then((response) => response.json())
        .then((js) => {
          setUserData({ name: js.name, email: js.email });
        });
    }

    return () => {};
  }, [props.user]);

  return (
    <>
      <Box
        sx={{
          flex: "1 1 0",
          minHeight: "60vh",
          border: "solid 1px",
        }}
      >
        <h2>User Details</h2>

        <Box sx={{  display: "flex"}}>

      
        <ul style={{textAlign:"left",flex:"1 1 0"}}>
          <li>Todo ID</li>
          <li>Todo Title</li>
          <li>User ID</li>
          <li>Name</li>
          <li>Email</li>
        </ul>
        {userData.name?
          <ul style={{flex:"2 2 0",textAlign:"left"}}>
            <li>{props.user.todoId}</li>
            <li>{props.user.todo}</li>
            <li>{props.user.user}</li>
            <li>{userData.name}</li>
            <li>{userData.email}</li>
          </ul>:""
        }
          </Box>
      </Box>
    </>
  );
}
export default Users;
