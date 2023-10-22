import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ShowInvitationsPage from "./pages/ShowInvitationsPage";
import ChatDetailedPage from "./pages/ChatDetailedPage";
import CreateNewGroupPage from "./pages/CreateNewGroupPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/create-new-group" element={<CreateNewGroupPage />} />
        <Route path="/show-invitations" element={<ShowInvitationsPage />} />
        <Route
          path="/group-detailed-page/:groupId"
          element={<ChatDetailedPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
