import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicLayout from "./routes/PublicLayout";
import LoginForm from "./pages/Auth/LoginForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthLayout from "./routes/AuthLayout";
import Dashboard from "./pages/Dashboard";
import SignupForm from "./pages/Auth/SignupForm";
import { AuthContextProvider } from "./context/AuthContextProvider";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-gray-300 overflow-auto">
            <div className="max-w-10/12 mx-auto py-6 px-4">
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
            </div>
            <Footer />
          </main>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
