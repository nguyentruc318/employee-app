import { Navigate, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee-page";
import LoginPage from "./pages/login-page";
import ProtectedRoute from "./components/protected-route";

function App() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/employee" element={<EmployeePage />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
