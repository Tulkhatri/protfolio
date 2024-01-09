import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/main-layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import About from "./pages/about";
import Skills from "./pages/skills";
import Education from "./pages/education";
import Work from "./pages/work";
import Experence from "./pages/experence";
import Contact from "./pages/contact";
import { Suspense } from "react";
import SuspenseLoader from "./components/suspanse";

const App = () => {
  return (
    <Router>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/education" element={<Education />} />
            <Route path="/work" element={<Work />} />
            <Route path="/experence" element={<Experence />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default App;
