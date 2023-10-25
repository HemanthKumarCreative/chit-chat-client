import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ShowInvitationsPage from "./pages/ShowInvitationsPage";
import ChatDetailedPage from "./pages/ChatDetailedPage";
import CreateNewGroupPage from "./pages/CreateNewGroupPage";
import Cookies from "js-cookie";

const App = () => {
  const [groups, setGroups] = useState([]);
  const cookie = Cookies.get("userInfo");
  let userData = {};
  if (cookie !== undefined) {
    userData = JSON.parse(cookie);
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/home"
          element={
            <HomePage
              groups={groups}
              setGroups={setGroups}
              userId={userData.userId}
            />
          }
        />
        <Route
          path="/create-new-group"
          element={
            <CreateNewGroupPage
              groups={groups}
              setGroups={setGroups}
              userId={userData.userId}
            />
          }
        />
        <Route
          path="/show-invitations"
          element={
            <ShowInvitationsPage
              groups={groups}
              setGroups={setGroups}
              recieverId={userData.userId}
              userName={userData.userName}
            />
          }
        />
        <Route
          path="/group-detailed-page/:groupId"
          element={
            <ChatDetailedPage
              groups={groups}
              setGroups={setGroups}
              userId={userData.userId}
              userName={userData.userName}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
