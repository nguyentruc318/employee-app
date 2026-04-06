import { Navigate, Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee-page";
import LoginPage from "./pages/login-page";
import AuthGuard from "./components/auth-guard";
import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/employee" element={<EmployeePage />} />
      </Route>
      <Route path="/" element={<Navigate to="/employee" replace />} />
      <Route element={<AuthGuard reverse />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
