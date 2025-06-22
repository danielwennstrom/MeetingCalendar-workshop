import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./routes/PublicLayout";
import LoginForm from "./pages/Auth/LoginForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./routes/AuthLayout";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/Auth/SignupForm";
import { AuthContextProvider } from "./context/AuthContextProvider";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route element={<AuthLayout />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
