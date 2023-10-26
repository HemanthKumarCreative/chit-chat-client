import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Tabs,
  Tab,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import axios from "axios";
import content from "../assets/content.json";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import GroupRemoveIcon from "@mui/icons-material/GroupRemove";
import IconButton from "@mui/material/IconButton";

const UserListModal = ({
  open,
  handleClose,
  members,
  admins,
  groupName,
  groupId,
  senderId,
  setGroupInfo,
}) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [users, setUsers] = useState([]);
  const { URL } = content;
  const [adminsInfo, setAdminsInfo] = useState([]);
  const [membersInfo, setMembersInfo] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${URL}/api/users`);
      if (response.statusText === "OK") {
        const users = await response.data;
        setUsers(users);
        const adminsInfo = users?.filter(
          (user) => admins?.includes(user.userId) === true
        );
        console.log({ adminsInfo });
        setAdminsInfo(adminsInfo);
        const membersInfo = users?.filter(
          (user) => members?.includes(user.userId) === true
        );
        console.log({ membersInfo });
        setMembersInfo(membersInfo);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchGroupInfo = async () => {
    if (groupId !== undefined) {
      try {
        const response = await axios.get(`${URL}/api/groups/g/${groupId}`);
        if (response.statusText === "OK") {
          const groupInfo = await response.data;
          setGroupInfo(groupInfo);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChangeTab = (event, tabIndex) => {
    setSelectedTab(tabIndex);
  };

  const handleMakeAdmin = async (userId) => {
    try {
      const response = await axios.put(`${URL}/api/groups/a/g/${groupId}`, {
        userId,
        role: "admin",
      });
      if (response.statusText === "OK") {
        const userAdminStatus = await response.data;
        console.log(userAdminStatus);
        await fetchGroupInfo();
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeUserGroups = async () => {
    try {
      const response = await axios.put(`${URL}/api/users/remove-user-groups`, {
        userId: senderId,
        groupId,
      });
      if (response?.statusText === "OK") {
        const message = await response?.data?.message;
        console.log({ message });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRemoveUser = async (userId) => {
    try {
      const response = await axios.put(`${URL}/api/groups/r/g/${groupId}`, {
        userId,
      });
      if (response.statusText === "OK") {
        const userRemovedStatus = await response.data;
        console.log(userRemovedStatus);
        await removeUserGroups();
        await fetchGroupInfo();
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInviteUser = async (recieverId) => {
    const invitation = {
      senderId,
      recieverId,
      groupId,
      groupName,
      invitationStatus: "pending",
    };
    try {
      const response = await axios.post(`${URL}/api/invitations`, invitation);
      if (response.statusText === "Created") {
        const userRemovedStatus = await response.data;
        console.log(userRemovedStatus);
        await fetchGroupInfo();
        await fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${URL}/api/users`);
        if (response.statusText === "OK") {
          const users = await response.data;
          setUsers(users);
          const adminsInfo = users?.filter(
            (user) => admins?.includes(user.userId) === true
          );
          console.log({ adminsInfo });
          setAdminsInfo(adminsInfo);
          const membersInfo = users?.filter(
            (user) => members?.includes(user.userId) === true
          );
          console.log({ membersInfo });
          setMembersInfo(membersInfo);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, [URL, admins, members]);

  const adminsTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {adminsInfo?.map((admin) => (
          <TableRow key={admin.userId}>
            <TableCell>{admin.userName}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const membersTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
          {admins?.includes(senderId) && <TableCell>Actions</TableCell>}
        </TableRow>
      </TableHead>
      <TableBody>
        {membersInfo?.map((member) => (
          <TableRow key={member.userId}>
            <TableCell>{member.userName}</TableCell>
            <TableCell>
              {admins?.includes(senderId) && (
                <IconButton
                  aria-label="people"
                  color="success"
                  onClick={() => handleRemoveUser(member.userId)}
                >
                  <GroupRemoveIcon />
                </IconButton>
              )}
              {admins?.includes(senderId) && (
                <IconButton
                  aria-label="people"
                  color="success"
                  onClick={() => handleMakeAdmin(member.userId)}
                >
                  <GroupAddIcon />
                </IconButton>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  const usersTable = () => (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>User Name</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users
          ?.filter(
            (user) =>
              admins.includes(user.userId) !== true &&
              members.includes(user.userId) !== true
          )
          .map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.userName}</TableCell>
              <TableCell>
                <IconButton
                  aria-label="people"
                  color="success"
                  onClick={() => handleInviteUser(user.userId)}
                >
                  <GroupAddIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>{`User Management ( ${groupName} )`}</DialogTitle>
      <DialogContent>
        <Tabs value={selectedTab} onChange={handleChangeTab}>
          <Tab label="Admins" />
          <Tab label="Members" />
          {admins?.includes(senderId) && <Tab label="Invite Users" />}
        </Tabs>
        <TableContainer sx={{ height: "70vh", width: "50vw" }}>
          {selectedTab === 0
            ? adminsTable()
            : selectedTab === 1
            ? membersTable()
            : admins?.includes(senderId) && usersTable()}
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default UserListModal;
