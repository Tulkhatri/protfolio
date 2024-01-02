import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};
export default App;
