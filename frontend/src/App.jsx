import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Stores from "./pages/Stores";
import OwnerDashboard from "./pages/OwnerDashboard";
import Users from "./pages/Users";
import AddUser from "./pages/AddUser";
import AddStore from "./pages/AddStore";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";


function App() {

  return (
    <Routes>

      <Route
        path="/"
        element={<Login />}
      />

      <Route
          path="/admin"
          element={
              <ProtectedRoute>
                  <AdminDashboard />
              </ProtectedRoute>
          }
      />

      <Route
          path="/stores"
          element={
              <ProtectedRoute>
                  <Stores />
              </ProtectedRoute>
          }
      />

      <Route
          path="/owner"
          element={
              <ProtectedRoute>
                  <OwnerDashboard />
              </ProtectedRoute>
          }
      />

      <Route
          path="/users"
          element={
              <ProtectedRoute>
                  <Users />
              </ProtectedRoute>
          }
      />

      <Route
          path="/add-user"
          element={
              <ProtectedRoute>
                  <AddUser />
              </ProtectedRoute>
          }
      />

      <Route
        path="/add-store"
        element={
            <ProtectedRoute>
                <AddStore />
            </ProtectedRoute>
        }
    />

    <Route
        path="/register"
        element={<Register />}
    />
    <Route
        path="/change-password"
        element={
            <ProtectedRoute>
                <ChangePassword />
            </ProtectedRoute>
        }
    />
    </Routes>

    
  );

}

export default App;