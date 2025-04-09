import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import Home from "./pages/problems/Home";
import CreateProblem from "./pages/problems/CreateProblem";
import Submission from "./pages/problems/Submission";
import Ranking from "./pages/problems/Ranking";
import Problem from "./pages/problems/Problem";
import ProtectedRoute from "./session/ProtectedRoute";
import UserManagement from "./pages/users/UserManagement";
import Profile from "./pages/Profile";
import SubmissionView from "./pages/problems/SubmissionView";
import ContestDetails from "./pages/contests/ContestDetails";
import ContestList from "./pages/contests/ContestList";
import ContestEditor from "./pages/contests/ContestEditor";

const App: React.FC = () => {
  return (
    <div className="bg-gray-300 min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<UpdatePassword />} />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submissions"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Submission />
              </ProtectedRoute>
            }
          />
          <Route
            path="/submission/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <SubmissionView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/ranking"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Ranking />
              </ProtectedRoute>
            }
          />
          <Route
            path="/problem/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <Problem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <ContestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/create"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ContestEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/edit/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ContestEditor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/view/:id"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <ContestList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/contests/view/:id/details"
            element={
              <ProtectedRoute allowedRoles={["admin", "user"]}>
                <ContestDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          {/* Only admin routes */}
          <Route
            path="/createProblem"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateProblem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/createProblem/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <CreateProblem />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UserManagement />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
