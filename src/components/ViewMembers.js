import React, { useState, useEffect } from "react";
import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import axios from "axios";

const ViewMembersModal = ({ open, handleClose, handleView, groupInfo }) => {
  const { members, admins } = groupInfo;
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState(JSON.parse(Cookies.get("userInfo")));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (members) {
          const userResponses = await Promise.all(
            members?.map((userId) =>
              axios.get(`http://localhost:5000/api/users/${userId}`)
            )
          );
          setUsers(userResponses?.map((response) => response.data));
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (open) {
      fetchUsers();
    }
  }, [open, members]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() =>
                        handleView(user.id, groupInfo.id, user.name)
                      }
                      disabled={!admins?.includes(userInfo.id)}
                    >
                      Make Admin
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
};

export default ViewMembersModal;
