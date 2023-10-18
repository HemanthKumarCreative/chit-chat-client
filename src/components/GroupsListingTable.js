import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import InviteMembersModal from "./InviteMembers";
import ViewMembersModal from "./ViewMembers";

import axios from "axios";

const GroupsListingTable = ({ groups, fetchGroups, userId }) => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [groupInfo, setGroupInfo] = useState({});

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchGroups();
  }, []);

  const handleInviteOpenModal = (groupId, groupName) => {
    setInviteModalOpen(true);
    setGroupInfo({ groupId, groupName });
  };

  const handleInviteCloseModal = () => {
    setInviteModalOpen(false);
  };

  const fetchGroupInfo = async (groupId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/groups/g/${groupId}`
      );
      console.log(response);
      setGroupInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleViewOpenModal = (groupId, groupName) => {
    setViewModalOpen(true);
    fetchGroupInfo(groupId);
    setGroupInfo({ groupId, groupName });
  };

  const handleViewCloseModal = () => {
    setViewModalOpen(false);
  };
  const handleInvite = async (userId) => {
    const { groupId, groupName } = groupInfo;
    try {
      const response = await axios.post(
        "http://localhost:5000/api/invitations",
        {
          userId,
          groupId,
          groupName,
        }
      );
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  };

  const handleView = async (userId, groupId, userName) => {
    console.log({ userId, groupId, userName });
    try {
      const response = await axios.put(
        `http://localhost:5000/api/groups/g/${groupId}`,
        { userId }
      );
      console.log(response);
      setGroupInfo(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Group Name</TableCell>
            <TableCell>Members Count</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>
                <Link
                  to={`/ChatDetailedPage/${group.id}`}
                  style={{ textDecoration: "none" }}
                >{`${group.name} ${
                  group?.admins?.includes(userId)
                    ? "  [ Admin ]"
                    : "  [ Member ]"
                }`}</Link>
              </TableCell>
              <TableCell>{group.members.length}</TableCell>
              <TableCell>
                {group.admins.includes(userId) && (
                  <button
                    onClick={() => handleInviteOpenModal(group.id, group.name)}
                  >
                    Invite Members
                  </button>
                )}
                <button
                  onClick={() => handleViewOpenModal(group.id, group.name)}
                >
                  View Members
                </button>
                <InviteMembersModal
                  open={inviteModalOpen}
                  handleClose={handleInviteCloseModal}
                  users={users}
                  handleInvite={handleInvite}
                />
                <ViewMembersModal
                  open={viewModalOpen}
                  handleClose={handleViewCloseModal}
                  handleView={handleView}
                  fetchGroupInfo={fetchGroupInfo}
                  groupInfo={groupInfo}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GroupsListingTable;
