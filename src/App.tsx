import { Route, Routes } from "react-router-dom";
import EmployeePage from "./pages/employee-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<EmployeePage />} />
    </Routes>
  );
}

export default App;
