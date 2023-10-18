import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import ShowInvitationsPage from "./pages/ShowInvitationsPage";
import ChatDetailedPage from "./pages/ChatDetailedPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<LoginPage />} />
        <Route path="/Home" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/Invitations" element={<ShowInvitationsPage />} />
        <Route
          path="/ChatDetailedPage/:groupId"
          element={<ChatDetailedPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
